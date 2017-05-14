define(function (require, exports, module) {
    var View = require('samsara/core/View');
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');
    var Transitionable = require('samsara/core/Transitionable');
    var Transform = require('samsara/core/Transform');

    function ProgrammingSlab(options) {
        var view = new View({
            origin: [0.5, 0.5],
            size: options.size
        });
        var surf = new Surface({
            content: options.text,
            properties: {
                background: options.properties.background,
                paddingTop: options.size[1] * 7/12+'px',
                paddingLeft: '20px',
                paddingRight: '20px'
            }
        });
        view.add(surf);

        var icon = new Surface({
            tagName: 'img',
            size: [options.size[1]/3, options.size[1]/3],
            origin: [0.5, 0.5],
            attributes: {
                src: options.icon
            },
            properties: {
                background: '#ffc400',
                borderRadius: '20px'
            }
        });
        icon.on('click', function () {
            window.open(options.url);
        });
        view.add({align: [0.5, 1/3]}).add(icon);

        view._setSize = view.setSize;
        view.setSize = function (size) {
            view._setSize(size);
        }

        return view;
    }

    module.exports = ProgrammingSlab;
});