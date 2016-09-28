define(function (require, exports, module) {
    var View = require('samsara/core/View');
    var Transform = require('samsara/core/Transform');
    var Transitionable = require('samsara/core/Transitionable');
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');
    var ScrollView = require('samsara/layouts/ScrollView');

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
            size: [50,400],//options.size,
            direction: 1,
            spacing: 20
        });
        sequence.addItems(options.content);

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
            .add(bar)
            .add(sequence);
        return node;
    }
    module.exports = SideBar;
});