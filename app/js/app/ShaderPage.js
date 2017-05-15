define(function (require, exports, module) {
    var Surface = require('samsara/dom/Surface');
    var Transitionable = require('samsara/core/Transitionable');
    var Transform = require('samsara/core/Transform');
    var Scrollview = require('samsara/layouts/Scrollview');
    var ScrollPage = require('app/ScrollPage');

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

        var tentacles = new Surface({
            tagName: 'img',
            size: [true, undefined],
            attributes: {
                src: 'https://fat.gfycat.com/CleanIgnorantBurro.gif'
            }
        });
        shaderSurfs.push(tentacles);

        shaderScroll.addItems(shaderSurfs);
        /*
        page.on('resize', function (size) {

        });
        */
        return page;
    }

    module.exports = ShaderPage;
});