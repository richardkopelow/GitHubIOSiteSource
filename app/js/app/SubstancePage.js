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
            tagName : 'img',
            size : [undefined, 551*window.innerWidth/958],
            attributes : {
                src : 'assets/SubstanceRenders/CircularStone.png'
            } 
        });
        images.push(circularStone);
        var grossBricks = new Surface({
            tagName : 'img',
            size : [undefined, 551*window.innerWidth/958],
            attributes : {
                src : 'assets/SubstanceRenders/GrossBricks.png'
            } 
        });
        images.push(grossBricks);
        var rustedMetal = new Surface({
            tagName : 'img',
            size : [undefined, 551*window.innerWidth/958],
            attributes : {
                src : 'assets/SubstanceRenders/RustedMetal.png'
            } 
        });
        images.push(rustedMetal);

        var innerHeight = 0;
        for(var i = 0; i < images.length; i++) {
            innerHeight += images[i].getSize()[1];
        }
        imageScroll.addItems(images);

        imageScroll.position.set(-1 * (innerHeight - options.size[1]));
        options.transitionable.on('update', function(value) {
            imageScroll.position.set((-1 - value) * (innerHeight - options.size[1]));
        });
        page.on('resize', function(size) {
            circularStone.setSize([undefined, 551*window.innerWidth/958]);
            grossBricks.setSize([undefined, 551*window.innerWidth/958]);
            rustedMetal.setSize([undefined, 551*window.innerWidth/958]);

            innerHeight = 0;
            for(var i = 0; i < images.length; i++) {
                innerHeight += images[i].getSize()[1];
            }
        });

        page.add(imageScroll);
        page.add(new Surface());
        return page;
    }

    module.exports = SubstancePage;

});