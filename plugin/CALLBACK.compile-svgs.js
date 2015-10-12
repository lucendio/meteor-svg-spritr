'use strict';


let fs = Npm.require( 'fs' );
let path = Npm.require( 'path' );
let File = Npm.require( 'vinyl' );

let SVGSpriter = Npm.require( 'svg-sprite' );


// more infos: https://github.com/jkphl/svg-sprite#general-configuration-options
const SVGSPRITR_CONFIGS = {
    //dest: {}
    //log: null
    shape: {
        dimension: {
            precision: 4,
            attributes: true
        },
        spacing: {
            padding: 0,
            box: 'content'
        },
        id: {
            generator( name ){
                return name.replace( /.svg$/, '' )
            }
        },

        // https://github.com/jkphl/svg-sprite/blob/master/docs/configuration.md#pre-defined-shape-transformation-with-custom-configuration-object-values
        // https://github.com/svg/svgo
        transform: [
            //'svgo'
        ]
    },
    svg: {
        xmlDeclaration: true,
        doctypeDeclaration: true,
        namespaceIDs: false,
        dimensionAttributes: true
    },
    mode: {
        //css: {
        //    dest: path.join( WORKING_DIR, 'client/ui/_styles/' ),
        //    sprite: 'svg-sprite.styl',
        //    render: {
        //        styl: true
        //    }
        //},
        css: false,

        //inline: true,
        symbol: {
            //dest: path.join( WORKING_DIR, 'public/img/' ),
            sprite: 'sprite.svg'
        },

        stack: false,
        view: false,
        defs: false
    }
};



Plugin.registerCompiler(
    {
        extensions: [
            'svg'
        ],
        filenames: [],
        archMatching: 'web'
    },
    ()=>{ return new SpriteCompiler(); }
);


// TODO: generate css file with svg size
//
function SpriteCompiler(){

}


Object.assign( SpriteCompiler.prototype, {

    constructor: SpriteCompiler,


    processFilesForTarget( files, options ){

        let spriter = new SVGSpriter( SVGSPRITR_CONFIGS );
        const CWD = process.cwd();
        let fileCount = files.length - 1;
        
        files.forEach( ( file, i )=>{

            const contentString = file.getContentsAsString();
            const contentBuffer = file.getContentsAsBuffer();

            let filename = file.getBasename();
            let filePath = file.getDirname();
            let extention = file.getExtension();
            let pathInPkg = file.getPathInPackage();

            spriter.add(
                // NOTE: produces empty ids in svg
                //new File({
                //    base: CWD,
                //    path: file.getPathInPackage(),
                //    contents: file.getContentsAsBuffer()
                //})
                path.join( CWD, pathInPkg ),
                filename,
                contentString
            );

            if( i < fileCount){
                return;
            }

            spriter.compile( function( err, result, data ){

                if( err ){ return err; }

                // NOTE: currently not reliable (race cond IMHO)
                file.addAsset({
                    data: result.symbol.sprite.contents,
                    path: 'img/sprite.svg'
                });

                // NOTE: making a detour and let the build process put the sprite into
                //       the right place within the build (also inconsistent)
                //fs.writeFileSync(
                //    path.join( CWD, 'public/img/sprite.svg' ),
                //    result.symbol.sprite.contents
                //);

            });
        });
    }

});




