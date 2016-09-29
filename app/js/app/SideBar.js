define(function (require, exports, module) {
    var View = require('samsara/core/View');
    var Transform = require('samsara/core/Transform');
    var Transitionable = require('samsara/core/Transitionable');
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');
    var ScrollView = require('samsara/layouts/ScrollView');
    var Icon = require('./Icon');

    function SideBar(options)
    {
        options = options || {};
        options.size = options.size || [undefined, undefined];
        options.padding= options.padding || 0;
        options.transition = options.transition || {duration: 1000, curve: 'easeOut'};
        var positionMod=options.side != 'right';

        var node=new View({
            size: [undefined, undefined],
            origin: options.origin
        });
        var barTransform=new Transitionable(-options.size[0] * positionMod);
        var bar = new ContainerSurface({
            size: options.size,
            origin: [0, 0.5],
            opacity: options.opacity,
            properties: options.properties
        });
        var sequence=new ScrollView({
            size: options.size,
            direction: 1,
            spacing: 20,
            marginTop: 20,
            marginBottom: 20
        });

        var icons = [];
        for(var i = 0; i < options.content.length; i++)
        {
            var iconContainer= new ContainerSurface({
                size:[options.size[0], options.size[0]-(options.size[0]-options.iconSize)/2],
            });
            var icon = new Icon({
                size: [options.iconSize, options.iconSize],
                origin: [0.5, 1],
                src: options.content[i].src
            });
            iconContainer
                .add({align: [0.5, 1]})
                .add(icon);
            icons.push(iconContainer);
        }
        sequence.addItems(icons);
        bar
            .add(sequence)

        node.show = function (callback)
        {
            barTransform.set((-options.size[0]) * (!positionMod) + (options.padding * (positionMod*2-1)), options.transition, callback);
        }

        node.hide = function (callback)
        {
            barTransform.set(-options.size[0] * positionMod, options.transition, callback);
        }

        node.setContent= function (contentArray)
        {
            for (var i = 0; i < contentArray.length; i++) {
                var element = contentArray[i];
                
            }
        }

        node
            .add({
                align: positionMod?[0, 0.5]:[1, 0.5],
                transform: barTransform.map(function (x){return Transform.translateX(x);})
            })
            .add(bar);
        return node;
    }
    module.exports = SideBar;
});