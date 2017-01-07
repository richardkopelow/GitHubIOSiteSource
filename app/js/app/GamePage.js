define(function (require, exports, module) {
    var Surface = require('samsara/dom/Surface');
    var Transitionable = require('samsara/core/Transitionable');
    var Transform = require('samsara/core/Transform');
    var ScrollPage = require('app/ScrollPage');
    var GameSlab = require('app/GameSlab');
    
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
            //value = value > 1/3 ? 1 : value * 3;
            var y = (value - 1) * partHeight;
            return Transform.translate([0, y, 0]);
        });
        page
            .add({transform : titlePosition})
            .add(title);

        var operationPegasusSlab = GameSlab({
            size : [window.innerWidth/2, partHeight],
            text : 'Operation Pegasus is a programming puzzle game in which you solve problems presented to you by your overlords and maybe even rebel.',
            icon : 'https://img.itch.io/aW1hZ2UvNjA4ODYvMjc2OTY2LnBuZw==/347x500/PBurgl.png',
            url : 'https://richardkopelow.itch.io/operation-pegasus'
        });
        var operationPegasusAlign = options.transitionable.map(function(value) {
            value = value > 7/8 ? 1 : value * 8/7;
            return [value / 2, 0];
        });
        page
            .add({
                align : operationPegasusAlign,
                transform : Transform.translate([0, partHeight, 0])
            }).add(operationPegasusSlab);

        var oneBulletSlab = GameSlab({
            right : true,
            size : [window.innerWidth/2, partHeight],
            text : 'One Bullet is a First person puzzle game in which you have one bullet. Use it wisely!',
            icon : 'https://img.itch.io/aW1hZ2UvOTgyNjMvNDYwODE3LnBuZw==/347x500/U92tL0.png',
            url : 'https://richardkopelow.itch.io/one-bullet'
        });
        var oneBulletAlign = options.transitionable.map(function(value) {
            value = value > 7/8 ? 1 : value * 8/7;
            return [1 - value / 2, 0];
        });
        page
            .add({
                align : oneBulletAlign,
                transform : Transform.translate([0, partHeight, 0])
            }).add(oneBulletSlab);

        var weAllScreamSlab = GameSlab({
            size : [window.innerWidth/2, partHeight],
            text : 'We All Scream tells the story of Dan and his quest to save icecream. Dan loves ice cream, convenient that it falls from the sky thanks to the cold climate and flying cows. Dan\'s dairy based lifestyle is threatened when one of his neighbor\'s experiments goes awry. Now there are a bunch of burning coal creatures running around warming the world. Extinguish the creatures before all hope goes down the drain like melted ice cream.',
            icon : 'https://img.itch.io/aW1hZ2UvNTM1NTkvMjM4NDA3LnBuZw==/347x500/yuj4fL.png',
            url : 'https://richardkopelow.itch.io/we-all-scream'
        });
        var weAllScreamAlign = options.transitionable.map(function(value) {
            return [value / 2, 0];
        });
        page
            .add({
                align : weAllScreamAlign,
                transform : Transform.translate([0, partHeight * 2, 0])
            }).add(weAllScreamSlab);

        var pulseWidthSlab = GameSlab({
            right : true,
            size : [window.innerWidth/2, partHeight],
            text : 'Pulse Width is a VR platformer for the HTC Vive. Use the Pulse Guns to push or pull on metal objects. Fling them, and yourself around the level to get to the goal.',
            icon : 'https://img.itch.io/aW1hZ2UvODcxNzgvNTEyNDM3LnBuZw==/347x500/oMJ7is.png',
            url : 'https://richardkopelow.itch.io/pulse-width'
        });
        var pulseWidthAlign = options.transitionable.map(function(value) {
            //value = value > 7/8 ? 1 : value * 8/7;
            return [1 - value / 2, 0];
        });
        page
            .add({
                align : pulseWidthAlign,
                transform : Transform.translate([0, partHeight * 2, 0])
            }).add(pulseWidthSlab);
            
        page.on('resize', function(size) {
            operationPegasusSlab.setSize([size[0] / 2, partHeight]);
            oneBulletSlab.setSize([size[0] / 2, partHeight]);
            weAllScreamSlab.setSize([size[0] / 2, partHeight]);
            pulseWidthSlab.setSize([size[0] / 2, partHeight]);
        });

        return page;
    }

    module.exports = GamePage;
});