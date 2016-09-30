define(function (require, exports, module) {
    var Context = require('samsara/dom/Context');
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');
    var Transitionable = require('samsara/core/Transitionable');
    var SideBar = require('app/SideBar');
    var IconContainer = require('app/IconContainer');

    var contentSize = new Transitionable([0, 0]);
    var content = new ContainerSurface({
        size: contentSize,
        origin: [1, 0.5]
    });

    var nameSurface = new Surface({
        size: [true,true],
        origin: [0, 0],
        content: 'Richard Kopelow',
        properties: {
            fontSize: '40px'
        }
    });
    content
        .add({align: [0, 0]})
        .add(nameSurface);

    var sidebarWidth = 90;
    var sideBar = SideBar({
        size: [sidebarWidth, undefined],
        origin: [0, 0.5],
        opacity: 1,
        iconSize: sidebarWidth - 10,
        transition: {duration: 500,curve: 'easeOut'},
        content: [{src: 'Assets/unityLogos/unity-logo.png'},
                  {src: 'http://3.bp.blogspot.com/-PTty3CfTGnA/TpZOEjTQ_WI/AAAAAAAAAeo/KeKt_D5X2xo/s1600/js.jpg'}],
        properties: {
            background: 'Black',
        }
    });

    var gameContainer = IconContainer({
        iconSize: 150,
        padding: 20
    });
    gameContainer.setIcons([
        {
            src: 'https://img.itch.io/aW1hZ2UvNjA4ODYvMjc2OTY2LnBuZw==/347x500/PBurgl.png'
        },
        {
            src: 'https://img.itch.io/aW1hZ2UvNTM1NTkvMjM4NDA3LnBuZw==/347x500/yuj4fL.png'
        }
    ]);

    // Create a Samsara Context as the root of the render tree
    var context = new Context();

    context
        .add({align: [1, 0.5]})
        .add(content);

    context
        .add({align: [0, 0.5]})
        .add(sideBar);

    content
        .add(gameContainer);

    context.on('resize', function(size){
        contentSize.set([size[0]-sidebarWidth,size[1]], {duration: 500,curve: 'easeOut'});
    });

    // Mount the context to a DOM element
    context.mount(document.body);

    // Begin the animation
    sideBar.show();
});
