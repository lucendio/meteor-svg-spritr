
'use strict';


const fs = Npm.require( 'fs' );
const path = Npm.require( 'path' );




//Plugin.registerMinifier(
//    {
//        extensions: [
//            'svg'
//        ],
//        filenames: []
//    },
//    ()=>{ return new svgBundler(); }
//);




let svgBundler = function(){

};


//svgoCompiler.prototype = Object.create( CachingCompiler.prototype );

Object.assign( svgBundler.prototype, {

    constructor: svgBundler,


    processFileForBundle( files, options ){

        const CWD = process.cwd();

        files.forEach( ( file, i )=>{

            ////file.getContentsAsString();
            ////file.getContentsAsBuffer();
            //
            //let filename = file.getBasename();
            //let filePath = file.getDirname();
            //let extention = file.getExtension();
            //let pathInPkg = file.getPathInPackage();
            //
            //let svg = svgo.optimize( file.getContentsAsString(), ( result )=>{
            //    //file.
            //});
            //
            //
            //if( i === fileCount - 5 ){
            //    //console.log( file.prototype )
            //}

        });
    }

});