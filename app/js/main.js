define(function (require, exports, module) {
    var Context = require('samsara/dom/Context');
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');
    var Transitionable = require('samsara/core/Transitionable');
    var HeaderFooterLayout = require('samsara/layouts/HeaderFooterLayout');


    var headerSize = new Transitionable([undefined, 0])
    var header = new Surface({
        size : headerSize,
        content : 'Richard Kopelow',
        properties : {
            background : '#e0e0e0'
        }
    });

    var content = new Surface({
        size : [undefined, undefined]
    });

    var layout = new HeaderFooterLayout({
        header : header,
        content : content
    });

    // Create a Samsara Context as the root of the render tree
    var context = new Context();
    context.add(layout);

    // Mount the context to a DOM element
    context.mount(document.body);

    headerSize.set([undefined, 40],{duration : 1000, curve: 'easeOut'});
});
