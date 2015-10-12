Package.describe( {
    name: 'lucendio:svg-spritr',
    summary: 'generate a sprite out of given .svg files (based on https://github.com/jkphl/svg-sprite/)',
    version: '0.1.0',
    git: 'TODO',
    documentation: 'README.md'
} );

//TODO: rework with new build plugin API:
// https://github.com/meteor/meteor/wiki/Build-Plugins-API


Package.onUse( function( api ){

    api.versionsFrom( '1.2' );


    api.use( [], [ 'server', 'client' ] ); //shared


    api.use( [
        'blaze-html-templates',
        'stylus',

        'isobuild:compiler-plugin@1.0.0',
        'isobuild:minifier-plugin@1.0.0',

        'ecmascript'
    ], 'client' );


    api.use( [], 'server' );



    api.export( [], [ 'server', 'client' ] );  //shared


    api.export( [], 'client' );


    api.export( [], 'server' );



    api.imply( [], [ 'server', 'client' ] );


    api.imply( [], 'client' );


    api.imply( [], 'server' );



    api.addFiles( [], [ 'server', 'client' ] );


    api.addFiles([
        'client/body.html',
        'client/templates/svg.html',
        'client/templates/svg.js',
        'client/templates/svg.styl',
        'client/templates/svg_icon.html',
        'client/templates/svg_icon.js',
        'client/templates/svg_icon.styl'
    ], 'client' );


    api.addFiles( [], 'server' );


});



// docs: https://github.com/meteor/meteor/wiki/Build-Plugins-API

Package.registerBuildPlugin({
    name: 'svg-spritr',
    use: [
        'stylus',

        'ecmascript',

        'caching-compiler@1.0.0'
    ],
    sources: [
        'lib/object.assign.js',
        'plugin/default.svgo-config.js',
        'plugin/FUTURE.compile-svgs.js'
        //'plugin/compile-svgs.js',
        //'plugin/cache-svgs.js',
        //'plugin/minify-svgs.js'
    ],
    npmDependencies: {
        //'svgo': '0.5.6',
        'svg-sprite': '1.2.10'
    }
});




Package.onTest( function( api ){

});