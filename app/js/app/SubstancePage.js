define(function (require, exports, module) {
    var Surface = require('samsara/dom/Surface');
    var Transitionable = require('samsara/core/Transitionable');
    var Transform = require('samsara/core/Transform');
    var Scrollview = require('samsara/layouts/Scrollview');
    var ScrollPage = require('app/ScrollPage');

    function SubstancePage(options) {
        var page = ScrollPage(options);

        var images = [];
        var imageScroll = new Scrollview({

        });

        var circularStone = new Surface({
            tagName: 'img',
            size: [undefined, 551 * window.innerWidth / 958],
            attributes: {
                src: 'assets/SubstanceRenders/CircularStone.png'
            }
        });
        images.push(circularStone);
        var grossBricks = new Surface({
            tagName: 'img',
            size: [undefined, 551 * window.innerWidth / 958],
            attributes: {
                src: 'assets/SubstanceRenders/GrossBricks.png'
            }
        });
        images.push(grossBricks);
        var copperOre = new Surface({
            tagName: 'img',
            size: [undefined, 551 * window.innerWidth / 958],
            attributes: {
                src: 'assets/SubstanceRenders/copperOre.png'
            }
        });
        images.push(copperOre);
        var rustedMetal = new Surface({
            tagName: 'img',
            size: [undefined, 551 * window.innerWidth / 958],
            attributes: {
                src: 'assets/SubstanceRenders/RustedMetal.png'
            }
        });
        images.push(rustedMetal);

        var innerHeight = 0;
        for (var i = 0; i < images.length; i++) {
            innerHeight += images[i].getSize()[1];
        }
        imageScroll.addItems(images);

        imageScroll.position.set(-1 * (innerHeight - options.size[1]));
        options.transitionable.on('update', function (value) {
            if (value < -1) {
                value = -1;
            }
            if (value > 0) {
                value = 0;
            }
            imageScroll.position.set((-1 - value) * (innerHeight - options.size[1]));
        });
        page.on('resize', function (size) {
            circularStone.setSize([undefined, 551 * window.innerWidth / 958]);
            grossBricks.setSize([undefined, 551 * window.innerWidth / 958]);
            rustedMetal.setSize([undefined, 551 * window.innerWidth / 958]);

            innerHeight = 0;
            for (var i = 0; i < images.length; i++) {
                innerHeight += images[i].getSize()[1];
            }
        });

        var substanceHeader = new Surface({
            content: '<h2>Substance</h2>',
            properties: {
                textAlign: 'center',
                color: 'white'
            }
        });
        var substanceText = new Surface({
            tagName: 'p',
            content: 'I dabble with Substance Designer to create procedurally generated materials.',
            properties: {
                paddingTop: '65px',
                paddingBottom: '50px',
                paddingLeft: '50px',
                paddingRight: '50px',
                color: 'white'
            }
        });

        page.add(imageScroll);
        page.add(new Surface({
            opacity: 0.2,
            properties: {
                background: 'black'
            }
        }));
        page.add(substanceHeader);
        page
            .add({ transform: Transform.translate([0, 0, 10]) })
            .add(substanceText);
        return page;
    }

    module.exports = SubstancePage;

});