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

        var image = new ContainerSurface({
            size: [options.height*541/304, undefined]
        });
        var imageEventCatcher = new Surface({
            tagName: 'img',
            attributes: {
                src: options.image
            }
        });
        image.add(imageEventCatcher);

        var textSurfacePosition = new Transitionable([0, options.height]);
        var textSurface = new Surface({
            size: [undefined, 100],
            content: options.text,
            properties: {
                color: 'white',
                background: 'black'
            }
        });
        image.add({
            transform: textSurfacePosition.map(function(val) {return Transform.translate(val);})
        }).add(textSurface);
        imageEventCatcher.on('mouseover', function () {
            textSurfacePosition.set([0, options.height - 100], { duration: 500, curve: 'easeOut' });
        });
        
        imageEventCatcher.on('mouseout', function () {
            textSurfacePosition.set([0, options.height], { duration: 500, curve: 'easeOut' });
        });
        
        return image;
    }
    module.exports = ShaderSlab;
});