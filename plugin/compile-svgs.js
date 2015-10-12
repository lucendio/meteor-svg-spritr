
'use strict';


const fs = Npm.require( 'fs' );
const path = Npm.require( 'path' );
const SVGO = Npm.require( 'svgo' );
const Future = Npm.require('fibers/future');




Plugin.registerCompiler(
    {
        extensions: [
            'svg'
        ],
        filenames: [],
        archMatching: 'web'
    },
    ()=>{ return new svgoCompiler(); }
);




let svgoCompiler = function(){
    //CachingCompiler.call( this );
};


//svgoCompiler.prototype = Object.create( CachingCompiler.prototype );

Object.assign( svgoCompiler.prototype, {

    constructor: svgoCompiler,


    processFilesForTarget( files, options ){

        const CWD = process.cwd();
        let svgo = new SVGO( SVGO_DEFAULT );

        let fileCount = files.length - 1;

        files.forEach( ( file, i )=>{

            //file.getContentsAsString();
            //file.getContentsAsBuffer();

            let filename = file.getBasename();
            let filePath = file.getDirname();
            let extention = file.getExtension();
            let pathInPkg = file.getPathInPackage();

            let svg = svgo.optimize( file.getContentsAsString(), ( result )=>{
                //file.
            });


            if( i === fileCount - 5 ){
                //console.log( file.prototype )
            }

        });
    },

    //getCacheKey(){
    //
    //},
    //
    //compileOneFile(){
    //
    //},
    //
    //addCompileResult(){
    //
    //},
    //
    //compileResultSize(){
    //
    //}

    //setDiskCacheDirectory(){
    //
    //}

});