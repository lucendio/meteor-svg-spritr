'use strict';



Template[ 'svg' ].helpers({
    name: function(){
        if( typeof this !== 'string' && typeof this.name !== 'undefined' ){
            return this.name;
        }
        return this;
    },
    classes: function(){
        var classes = 'inline-svg';

        if( typeof this.classes === 'string' ){
            if( this.classes.trim().length > 0 ){
                classes = classes +' '+ this.classes.trim();
            }else{
                classes = '';
            }

        }

        return classes;
    },
    sprite: function(){
        return '/img/sprite.svg'
    }

} );


Template[ 'svg' ].events( {} );




Template[ 'svg' ].onCreated( function(){

});


Template[ 'svg' ].onRendered( function(){

});


Template[ 'svg' ].onDestroyed( function(){

});