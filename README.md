Creating an SVG sprite with the new Build Plugin API (Meteor@1.2)
=================================================================

__NOTE:__ under heavy development

## History

###v1

``plugin/CALLBACK.compile-svgs.js`` was the first approach, but after deploying to 
production, I noticed an inconsistency in the appearance of the sprite file 
after the build process within the build. I assumed it could be caused by the 
callback which registered the file within the build process.


###v2 

``plugin/FUTURE.compile-svgs.js`` ius the current approach. I figured since the build
process uses fibers to parallelize it could be a more reliable way. currently it works.

 
### next version and issues

Sadly the current Build Plugin API does not allow other files then css and js to put through
a minifier. Regarding the [Build Plugin API Docs: 5.](https://github.com/meteor/meteor/wiki/Build-Plugins-API#build-plugins-in-isobuild)
is the Step were concatenation happens and thats were all svgs should come together in one SVG sprite. 
In my opinion an _ideal solution_ would be to use the compiler to put the svgs through 
[SVGO](https://github.com/svg/svgo), create a stylesheet like svg-sprite does it (but
in a way tro leverage the Build Plugin API, eg.g in terms of caching), caching all svgs,
and finally but everything through a minifier to concatenate as mentioned above.