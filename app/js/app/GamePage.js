define(function (require, exports, module) {
    var Surface = require('samsara/dom/Surface');
    var Transitionable = require('samsara/core/Transitionable');
    var Transform = require('samsara/core/Transform');
    var ScrollPage = require('app/ScrollPage');
    var GameSlab = require('app/GameSlab');

    function GamePage(options) {
        var page = ScrollPage(options);
        var partHeight = options.size[1] / 4;
        var title = new Surface({
            size: [undefined, partHeight],
            content: '<hx>Games</hx>',
            properties: {
                textAlign: 'center',
                background: '#e0e0e0',
                lineHeight: partHeight + 'px'
            }
        });
        var titlePosition = options.transitionable.map(function (value) {
            //value = value > 1/3 ? 1 : value * 3;
            var y = (value - 1) * partHeight;
            return Transform.translate([0, y, 0]);
        });
        page
            .add({ transform: titlePosition })
            .add(title);
        
        var flipSlab = GameSlab({
            size: [window.innerWidth / 2, partHeight],
            text: 'Flip is a thumb twiddling puzzle game in which you flip over tiles to make them all light. Clear the board and move on to the next one.',
            icon: 'https://img.itch.zone/aW1hZ2UvMTE5MDIzLzYwMDc4OS5wbmc=/315x250%23c/4pVmIx.png',
            url: 'https://play.google.com/store/apps/details?id=com.RichardKopelow.Flip'
        });
        var flipAlign = options.transitionable.map(function (value) {
            value = value > 6 / 8 ? 1 : value * 8 / 6;
            return [value / 2, 0];
        });
        page
            .add({
                align: flipAlign,
                transform: Transform.translate([0, partHeight, 0])
            }).add(flipSlab);
        
        var zipMinerSlab = GameSlab({
            right: true,
            size: [window.innerWidth / 2, partHeight],
            text: 'ZipMiner is a casual clicker game in which you dig through the earth to earn money, to buy upgrades, to dig through the earth better.<br>This was made as part of the 1-bit Clicker Jam on Itch.io',
            icon: 'https://img.itch.zone/aW1hZ2UvMTM0NDc0LzYzNzA2OS5wbmc=/347x500/q3QU%2Ba.png',
            url: 'https://richardkopelow.itch.io/zipminer'
        });
        var zipMinerAlign = options.transitionable.map(function (value) {
            value = value > 6 / 8 ? 1 : value * 8 / 6;
            return [1 - value / 2, 0];
        });
        page
            .add({
                align: zipMinerAlign,
                transform: Transform.translate([0, partHeight, 0])
            }).add(zipMinerSlab);

        var operationPegasusSlab = GameSlab({
            size: [window.innerWidth / 2, partHeight],
            text: 'Operation Pegasus is a programming puzzle game in which you solve problems presented to you by your overlords and maybe even rebel.',
            icon: 'https://img.itch.io/aW1hZ2UvNjA4ODYvMjc2OTY2LnBuZw==/347x500/PBurgl.png',
            url: 'https://richardkopelow.itch.io/operation-pegasus'
        });
        var operationPegasusAlign = options.transitionable.map(function (value) {
            value = value > 7 / 8 ? 1 : value * 8 / 7;
            return [value / 2, 0];
        });
        page
            .add({
                align: operationPegasusAlign,
                transform: Transform.translate([0, partHeight*2, 0])
            }).add(operationPegasusSlab);

        var oneBulletSlab = GameSlab({
            right: true,
            size: [window.innerWidth / 2, partHeight],
            text: 'One Bullet is a First person puzzle game in which you have one bullet. Use it wisely!',
            icon: 'https://img.itch.io/aW1hZ2UvOTgyNjMvNDYwODE3LnBuZw==/347x500/U92tL0.png',
            url: 'https://richardkopelow.itch.io/one-bullet'
        });
        var oneBulletAlign = options.transitionable.map(function (value) {
            value = value > 7 / 8 ? 1 : value * 8 / 7;
            return [1 - value / 2, 0];
        });
        page
            .add({
                align: oneBulletAlign,
                transform: Transform.translate([0, partHeight*2, 0])
            }).add(oneBulletSlab);

        var weAllScreamSlab = GameSlab({
            size: [window.innerWidth / 2, partHeight],
            text: 'We All Scream tells the story of Dan and his quest to save icecream. Dan loves ice cream, convenient that it falls from the sky thanks to the cold climate and flying cows. Dan\'s dairy based lifestyle is threatened when one of his neighbor\'s experiments goes awry. Now there are a bunch of burning coal creatures running around warming the world. Extinguish the creatures before all hope goes down the drain like melted ice cream.',
            icon: 'https://img.itch.io/aW1hZ2UvNTM1NTkvMjM4NDA3LnBuZw==/347x500/yuj4fL.png',
            url: 'https://richardkopelow.itch.io/we-all-scream'
        });
        var weAllScreamAlign = options.transitionable.map(function (value) {
            return [value / 2, 0];
        });
        page
            .add({
                align: weAllScreamAlign,
                transform: Transform.translate([0, partHeight * 3, 0])
            }).add(weAllScreamSlab);

        var pulseWidthSlab = GameSlab({
            right: true,
            size: [window.innerWidth / 2, partHeight],
            text: 'Pulse Width is a VR platformer for the HTC Vive. Use the Pulse Guns to push or pull on metal objects. Fling them, and yourself around the level to get to the goal. I only had 48 hours durring a game jam to make this because I don\'t own a Vive so it is not polished but I think it is incredibly fun.',
            icon: 'https://img.itch.io/aW1hZ2UvODcxNzgvNTEyNDM3LnBuZw==/347x500/oMJ7is.png',
            url: 'https://richardkopelow.itch.io/pulse-width'
        });
        var pulseWidthAlign = options.transitionable.map(function (value) {
            //value = value > 7/8 ? 1 : value * 8/7;
            return [1 - value / 2, 0];
        });
        page
            .add({
                align: pulseWidthAlign,
                transform: Transform.translate([0, partHeight * 3, 0])
            }).add(pulseWidthSlab);

        page.on('resize', function (size) {
            flipSlab.setSize([size[0] / 2, partHeight]);
            zipMinerSlab.setSize([size[0] / 2, partHeight]);
            operationPegasusSlab.setSize([size[0] / 2, partHeight]);
            oneBulletSlab.setSize([size[0] / 2, partHeight]);
            weAllScreamSlab.setSize([size[0] / 2, partHeight]);
            pulseWidthSlab.setSize([size[0] / 2, partHeight]);
        });

        return page;
    }

    module.exports = GamePage;
});