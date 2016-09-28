define(function (require, exports, module) {
    var Context = require('samsara/dom/Context');
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');
    var SideBar = require('app/SideBar');

    var gamesSurface=new Surface({
        size: [50, 50],
        properties: {
            background: 'red'
        }
    });

    var sideBar = SideBar({
        size: [75, undefined],
        origin: [0, 0.5],
        opacity: 0.7,
        transition: {duration: 500,curve: 'easeOut'},
        content: [gamesSurface],
        properties: {
            background: 'black',
            //borderRadius: '20px'
        }
    });

    // Create a Samsara Context as the root of the render tree
    var context = new Context();

    context
        .add({align: [0, 0.5]})
        .add(sideBar);

    // Mount the context to a DOM element
    context.mount(document.body);

    // Begin the animation
    sideBar.show();
});
