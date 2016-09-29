define(function (require, exports, module) {
    var Context = require('samsara/dom/Context');
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');
    var SideBar = require('app/SideBar');
    var IconContainer = require('app/IconContainer');

    var sideBar = SideBar({
        size: [75, undefined],
        origin: [0, 0.5],
        opacity: 1,
        iconSize: 50,
        transition: {duration: 500,curve: 'easeOut'},
        content: [{src: 'Assets/unityLogos/unity-logo-white.png'},
                  {src: 'http://3.bp.blogspot.com/-PTty3CfTGnA/TpZOEjTQ_WI/AAAAAAAAAeo/KeKt_D5X2xo/s1600/js.jpg'}],
        properties: {
            background: 'black',
            //borderRadius: '20px'
        }
    });

    var gameContainer = IconContainer({
        iconSize: 100
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
        .add({align: [0, 0.5]})
        .add(sideBar);

    context
        .add(gameContainer);

    // Mount the context to a DOM element
    context.mount(document.body);

    // Begin the animation
    sideBar.show();
});
