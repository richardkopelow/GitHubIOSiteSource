define(function (require, exports, module) {
    var View = require('samsara/core/View');
    var Transform = require('samsara/core/Transform');
    var Transitionable = require('samsara/core/Transitionable');
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');

    function SideBar(options)
    {
        options = options || {};
        options.size = options.size || [undefined, undefined];
        var positionMod=options.side != 'right';

        var node=new View({
            size: [undefined, undefined],
            origin: options.origin
        });
        var barTransform=new Transitionable(-options.size[0] * positionMod);
        var bar = new ContainerSurface({
            size: options.size,
            origin: [0, 0.5],
            properties: {
                background: options.properties.background,
                borderRadius: options.properties.borderRadius
            }
        });

        node.show = function (callback)
        {
            barTransform.set(-options.size[0] * (!positionMod), {duration: 1000, curve: 'easeIn'}, callback);
        }

        node.hide = function (callback)
        {
            barTransform.set(-options.size[0] * positionMod, {duration: 1000, curve: 'easeOut'}, callback);
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