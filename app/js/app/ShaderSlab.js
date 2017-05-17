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

        var textSurfaceHeight = 150;
        var textSurfacePosition = new Transitionable([0, options.height]);
        var textSurface = new Surface({
            size: [undefined, textSurfaceHeight],
            content: options.text,
            properties: {
                color: 'white',
                background: 'black'
            }
        });

        var downloadLink = new Surface({
            size: [options.height*541/304 - 20, 40],
            origin: [0.5, 1],
            content: 'Download',
            properties: {
                background: '#c9c9c9',
                borderRadius: '15px',
                textAlign: 'center',
                lineHeight: '40px'
            }
        });
        
        downloadLink.on('click', function () {
            window.open(options.downloadLink);
        });
        
        var textHanger = container.add({
            transform: textSurfacePosition.map(function(val) {return Transform.translate(val);})
        });
        textHanger.add(textSurface);
        textHanger.add({
            align: [0.5, 0],
            transform: Transform.translateY(textSurfaceHeight - 15)
        }).add(downloadLink);

        image.on('mouseover', function (event) {
            textSurfacePosition.set([0, options.height - textSurfaceHeight], { duration: 500, curve: 'easeOut' });
        });
        image.on('mouseout', function (event) {
            if (event.relatedTarget != textSurface._currentTarget)
            {
                textSurfacePosition.set([0, options.height], { duration: 500, curve: 'easeOut' });
            }
        });
        textSurface.on('mouseout', function (event) {
            if (event.relatedTarget != image._currentTarget && event.relatedTarget != downloadLink._currentTarget)
            {
                textSurfacePosition.set([0, options.height], { duration: 500, curve: 'easeOut' });
            }
        });
        
        return container;
    }
    module.exports = ShaderSlab;
});