define(function (require, exports, module) {
    var Context = require('samsara/dom/Context');
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');
    var Transitionable = require('samsara/core/Transitionable');
    var Transform = require('samsara/core/Transform');
    var HeaderFooterLayout = require('samsara/layouts/HeaderFooterLayout');
    var Scrollview = require('samsara/layouts/Scrollview');
    var AboutPage = require('app/AboutPage');
    var SubstancePage = require('app/SubstancePage');
    var GamePage = require('app/GamePage');
    var ProgrammingPage = require('app/ProgrammingPage');

    var headerSize = new Transitionable([undefined, 0]);
    var header = new Surface({
        classes: ['dropdown-header'],
        size: headerSize,
        content: 'Richard Kopelow',
        properties: {
            background: '#0288d1',
            color: 'white'
        }
    });

    var footerNormalSize = 25;
    var footerLargeSize = 50;
    var footerSize = new Transitionable([undefined, 0]);
    var footer = new ContainerSurface({
        size: footerSize,
        properties: {
            background: '#212121'
        }
    });
    footer.on('mouseover', function () {
        footerSize.set([undefined, footerLargeSize], { duration: 1000, curve: 'easeOut' });
    });
    footer.on('mouseout', function () {
        footerSize.set([undefined, footerNormalSize], { duration: 1000, curve: 'easeOut' });
    });
    var githubLink = new Surface({
        tagName: 'a',
        size: [true, true],
        content: 'github.com/richardkopelow',
        attributes: {
            href: 'http://github.com/richardkopelow'
        }
    });
    footer.add(githubLink);

    var pages = [];
    var beforeHeights = [];
    function onScreenMapper(index) {
        return function (value) {
            value = -value;
            if (value > beforeHeights[beforeHeights.length - 1]) {
                value = beforeHeights[beforeHeights.length - 1];
            }
            if (value < 0) {
                value = 0;
            }
            var height = pages[index].getSize()[1];
            if (value <= beforeHeights[index] && value >= beforeHeights[index + 1] - window.innerHeight) {
                return 1;
            }
            var dif = value - beforeHeights[index];
            if (dif < height && dif > 0) {
                return 1 - (dif / height);
            }
            dif = beforeHeights[index + 1] - window.innerHeight - value;
            if (dif < height && dif > 0) {
                return 1 - (dif / height);
            }
            return 0;
        };
    }
    var contentScroll = new Scrollview({

    });

    var aboutPage = AboutPage({
        size: [undefined, 400],
        properties: {
            background: 'white'//'#03a9f4'
        },
        transitionable: contentScroll.position.map(onScreenMapper(0))
    });
    pages.push(aboutPage)

    var scrollHeight = window.innerHeight;
    var substancePage = SubstancePage({
        size: [undefined, 400],
        properties: {
        },
        transitionable: contentScroll.position.map(function (value) {
            return value / (beforeHeights[beforeHeights.length - 1] - scrollHeight);
        })
    });

    pages.push(substancePage);

    var gamesPage = GamePage({
        size: [undefined, 500],
        properties: {
            background: '#03a9f4'
        },
        transitionable: contentScroll.position.map(onScreenMapper(2))
    });
    pages.push(gamesPage);

    var programmingPage = ProgrammingPage({
        size: [undefined, 400],
        transitionable: contentScroll.position.map(onScreenMapper(3))
    });
    pages.push(programmingPage);

    for (var i = 0; i <= pages.length; i++) {
        beforeHeights[i] = 0;
        for (var j = 0; j < i; j++) {
            beforeHeights[i] += pages[j].getSize()[1];
        }
    }
    contentScroll.addItems(pages);
    contentScroll.position.on('update', function (value) {
        console.log(value);
    });
    contentScroll.on('resize', function (size) {
        scrollHeight = size[1];
    });

    var layout = new HeaderFooterLayout({
        header: header,
        content: contentScroll,
        footer: footer
    });

    // Create a Samsara Context as the root of the render tree
    var context = new Context();
    context.add(layout);

    // Mount the context to a DOM element
    context.mount(document.body);

    headerSize.set([undefined, 40], { duration: 1000, curve: 'easeOut' });
    footerSize.set([undefined, footerNormalSize], { duration: 1000, curve: 'easeOut' });
});
