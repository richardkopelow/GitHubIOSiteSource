define(function (require, exports, module) {
    var Surface = require('samsara/dom/Surface');
    var Transitionable = require('samsara/core/Transitionable');
    var Transform = require('samsara/core/Transform');
    var ScrollPage = require('app/ScrollPage');
    
    function GamePage(options) {
        var page = ScrollPage(options);
        var partHeight = options.size[1] / 3;
        var title = new Surface({
            size : [undefined, partHeight],
            content : '<h2>Games</h2>',
            properties : {
                textAlign : 'center',
                background : '#e0e0e0'
            }
        });
        var titlePosition = options.transitionable.map(function(value) {
            value = value > 1/3 ? 1 : value * 3;
            var y = (value - 1) * partHeight;
            return Transform.translate([0, y, 0]);
        });
        page
            .add({transform : titlePosition})
            .add(title);

        var operationPegasusTile = new Surface({
            origin : [1,0],
            size : [window.innerWidth / 2, partHeight],
            content : 'Operation Pegasus is a programming puzzle game in which you solve problems presented to you by your overlords and maybe even rebel.',
            properties : {
                background : '#e0e0e0',
                paddingLeft : '20px',
                paddingRight : partHeight + 20 + 'px'
            }
        });
        var operationPegasusIcon = new Surface({
            tagName : 'img',
            size : [partHeight, partHeight],
            origin : [1, 0],
            attributes : {
                src : 'https://img.itch.io/aW1hZ2UvNjA4ODYvMjc2OTY2LnBuZw==/347x500/PBurgl.png'
            },
            properties : {
                background : '#ffc400',
                borderRadius : '20px'
            }
        });
        operationPegasusIcon.on('click', function() {
            window.open('https://richardkopelow.itch.io/operation-pegasus');
        });
        var operationPegasusAlign = options.transitionable.map(function(value) {
            value = value > 2/3 ? 1 : value * 3/2;
            return [value / 2, 0];
        });
        var opHanger = page
            .add({
                align : operationPegasusAlign,
                transform : Transform.translate([0, partHeight, 0])
            });
        opHanger.add(operationPegasusTile);
        opHanger.add(operationPegasusIcon);
            
        page.on('resize', function(size) {
            operationPegasusTile.setSize([size[0] / 2, partHeight]);
        });

        return page;
    }

    module.exports = GamePage;
});