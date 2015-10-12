
'use strict';


const fs = Npm.require( 'fs' );
const path = Npm.require( 'path' );
const Future = Npm.require('fibers/future');

const SVGSpriter = Npm.require( 'svg-sprite' );


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

        transform: SVGO_DEFAULT
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


let SpriteCompiler = function(){

};


Object.assign( SpriteCompiler.prototype, {

    constructor: SpriteCompiler,


    processFilesForTarget( files, options ){

        const CWD = process.cwd();

        let fileCount = files.length - 1;

        let { spriter, lastFile } = files.reduce( ( pointer, file, i )=>{

            const contentString = file.getContentsAsString();
            const contentBuffer = file.getContentsAsBuffer();

            let filename = file.getBasename();
            let filePath = file.getDirname();
            let extention = file.getExtension();
            let pathInPkg = file.getPathInPackage();

            pointer.spriter.add(
                path.join( CWD, pathInPkg ),
                filename,
                contentString
            );

            pointer.lastFile = file;

            return pointer;

        } , { spriter: new SVGSpriter( SVGSPRITR_CONFIGS ) } );


        const future = new Future();

        spriter.compile( ( err, result, data )=>{
            if( err ){
                future.throw( err );
            }else{
                lastFile.addAsset({
                    data: result.symbol.sprite.contents,
                    path: 'img/sprite.svg'
                });
                future.return();
            }
        });

        return future.wait();
    }

});