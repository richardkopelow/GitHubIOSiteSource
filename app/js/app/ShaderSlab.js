define(function (require, exports, module) {
    var View = require('samsara/core/View');
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');
    var Transitionable = require('samsara/core/Transitionable');
    var Transform = require('samsara/core/Transform');

    function ShaderSlab(options) {
        var view = new View({
            size: [true, undefined]
        });

        var container = new ContainerSurface({
            size: [options.height*541/304, undefined]
        });
        var image = new Surface({
            tagName: 'img',
            attributes: {
                src: options.image
            }
        });
        container.add(image);

        var textSurfacePosition = new Transitionable([0, options.height]);
        var textSurface = new Surface({
            size: [undefined, 100],
            content: options.text,
            properties: {
                color: 'white',
                background: 'black'
            }
        });
        container.add({
            transform: textSurfacePosition.map(function(val) {return Transform.translate(val);})
        }).add(textSurface);

        image.on('mouseover', function (event) {
            textSurfacePosition.set([0, options.height - 100], { duration: 500, curve: 'easeOut' });
        });
        image.on('mouseout', function (event) {
            if (event.relatedTarget != textSurface._currentTarget)
            {
                textSurfacePosition.set([0, options.height], { duration: 500, curve: 'easeOut' });
            }
        });
        textSurface.on('mouseout', function (event) {
            if (event.relatedTarget != image._currentTarget)
            {
                textSurfacePosition.set([0, options.height], { duration: 500, curve: 'easeOut' });
            }
        });
        
        return container;
    }
    module.exports = ShaderSlab;
});