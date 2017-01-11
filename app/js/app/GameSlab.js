define(function (require, exports, module) {
    var View = require('samsara/core/View');
    var Surface = require('samsara/dom/Surface');
    var Transitionable = require('samsara/core/Transitionable');
    var Transform = require('samsara/core/Transform');
    var ScrollPage = require('app/ScrollPage');

    function GameSlab(options) {
        var slabView = new View({
            origin: options.right ? [0, 0] : [1, 0],
            size: options.size
        });
        var slabTile = new Surface({
            origin: options.right ? [0, 0] : [1, 0],
            size: options.size,
            content: options.text,
            properties: {
                background: '#e0e0e0',
                paddingLeft: options.right ? options.size[1] + 20 + 'px' : '20px',
                paddingRight: options.right ? '20px' : options.size[1] + 20 + 'px'
            }
        });
        var slabIcon = new Surface({
            tagName: 'img',
            size: [options.size[1], options.size[1]],
            origin: options.right ? [0, 0] : [1, 0],
            attributes: {
                src: options.icon
            },
            properties: {
                background: '#ffc400',
                borderRadius: '20px'
            }
        });
        slabIcon.on('click', function () {
            window.open(options.url);
        });

        slabView._setSize = slabView.setSize;
        slabView.setSize = function (size) {
            slabView._setSize(size);
            slabTile.setSize(size);
        }

        var hanger = slabView.add({ align: options.right ? [0, 0] : [1, 0] });
        hanger.add(slabTile);
        hanger.add(slabIcon);

        return slabView;
    }

    module.exports = GameSlab;
});