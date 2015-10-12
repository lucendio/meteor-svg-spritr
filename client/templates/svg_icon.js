'use strict';




Template[ 'svg_icon' ].helpers({
    name: function(){
        if( typeof this !== 'string' && typeof this.name !== 'undefined' ){
            return this.name;
        }
        return this;
    },
    classes: function(){
        var classes = '';

        if( typeof this.classes === 'string' ){
            classes = ' ' + this.classes.trim();
        }

        return classes;
    }
});


Template[ 'svg_icon' ].events( {} );




Template[ 'svg_icon' ].onCreated( function(){
    var instance = Template.instance();


} );


Template[ 'svg_icon' ].onRendered( function(){
    var instance = Template.instance();


} );


Template[ 'svg_icon' ].onDestroyed( function(){
    var instance = Template.instance();


} );