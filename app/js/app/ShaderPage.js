define(function (require, exports, module) {
    var Surface = require('samsara/dom/Surface');
    var Transitionable = require('samsara/core/Transitionable');
    var Transform = require('samsara/core/Transform');
    var Scrollview = require('samsara/layouts/Scrollview');
    var ScrollPage = require('app/ScrollPage');
    var ShaderSlab = require('app/ShaderSlab');

    function ShaderPage(options) {
        var page = ScrollPage(options);

        var background = new Surface({
            properties: {
                background: '#2e2e2e'
            }
        });
        page.add(background);

        var header = new Surface({
            size: [200, undefined],
            content: '<hx>Shaders</hx>',
            opacity: options.transitionable,
            properties: {
                paddingLeft: '50px',
                lineHeight: options.size[1]+'px',
                color: 'white'
            }
        });
        page.add(header);

        var shaderSurfs = [];
        var shaderScroll = new Scrollview({
            direction: 0,
            size: [window.innerWidth, undefined]
        });
        page.add({
            transform: Transform.translate([200, 0])
        }).add(shaderScroll);

        var tentacles = ShaderSlab({
            height: options.size[1],
            text: 'This is a volumetric shader the renders the tentacles using Signed Distance Fields. Unlike with normal transparent shaders that only deal with the surface and ignore the volume of the model, the transparency is based on how much you are looking through like an actual semi-opaque material.',
            image: 'https://fat.gfycat.com/CleanIgnorantBurro.gif'
        });
        shaderSurfs.push(tentacles);

        var destruction = ShaderSlab({
            height: options.size[1],
            text: 'This destruction shader takes up to 10 origin points that can be expanded to cut away at the model. The color and thicknes of the band can be configured. A script is used ot manage the origin points and the level of expansion. This effect can be used for destroying or spawning objects.',
            image: 'https://fat.gfycat.com/NextBoilingCooter.gif'
        });
        shaderSurfs.push(destruction);

        shaderScroll.addItems(shaderSurfs);
        /*
        page.on('resize', function (size) {

        });
        */
        return page;
    }

    module.exports = ShaderPage;
});