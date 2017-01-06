define(function (require, exports, module) {
    var Context = require('samsara/dom/Context');
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');
    var Transitionable = require('samsara/core/Transitionable');
    var Transform = require('samsara/core/Transform');
    var HeaderFooterLayout = require('samsara/layouts/HeaderFooterLayout');
    var Scrollview = require('samsara/layouts/Scrollview');

    var headerSize = new Transitionable([undefined, 0]);
    var header = new Surface({
        classes : ['dropdown-header'],
        size : headerSize,
        content : 'Richard Kopelow',
        properties : {
            background : '#e0e0e0'
        }
    });

    var footerNormalSize = 25;
    var footerLargeSize = 50;
    var footerSize = new Transitionable([undefined, 0]);
    var footer = new Surface({
        size : footerSize,
        properties : {
            background : '#212121'
        }
    });
    footer.on('mouseover', function() {
        footerSize.set([undefined, footerLargeSize],{duration : 1000, curve: 'easeOut'});
    });
    footer.on('mouseout', function() {
        footerSize.set([undefined, footerNormalSize],{duration : 1000, curve: 'easeOut'});
    });

    var pages = [];
    var contentScroll = new Scrollview({

    });

    var aboutPage = new ContainerSurface({
        size: [undefined, 400]
    });
    var aboutHeader = new Surface({
        content : '<h2>About Me</h2>',
        properties : {
            textAlign : 'center'
        }
    });
    var aboutText = new Surface({
        tagName : 'p',
        content : 'I\'m Richard Kopelow, I am an undergraduate Computer Engineering major at Stevens Institute of Technology. I program and I make games as a hobby, this is a place where you can see some of my stuff.',
        properties : {
            paddingTop : '65px',
            paddingBottom : '50px',
            paddingLeft : '50px',
            paddingRight : '50px'
        }
    });
    aboutPage.add(aboutHeader);
    aboutPage
        .add({transform : Transform.translate([0, 0, 0])})
        .add(aboutText);
    pages.push(aboutPage);
    contentScroll.addItems(pages);

    

    var layout = new HeaderFooterLayout({
        header : header,
        content : contentScroll,
        footer : footer
    });

    // Create a Samsara Context as the root of the render tree
    var context = new Context();
    context.add(layout);

    // Mount the context to a DOM element
    context.mount(document.body);

    headerSize.set([undefined, 40],{duration : 1000, curve: 'easeOut'});
    footerSize.set([undefined, footerNormalSize],{duration : 1000, curve: 'easeOut'});
});
