define(function (require, exports, module) {
    var Context = require('samsara/dom/Context');
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');
    var Transitionable = require('samsara/core/Transitionable');
    var Transform = require('samsara/core/Transform');
    var HeaderFooterLayout = require('samsara/layouts/HeaderFooterLayout');
    var Scrollview = require('samsara/layouts/Scrollview');
    var SequentialLayout = require('samsara/layouts/SequentialLayout');
    var AboutPage = require('app/AboutPage');
    var SubstancePage = require('app/SubstancePage');
    var GamePage = require('app/GamePage');
    var ProgrammingPage = require('app/ProgrammingPage');
    var ShaderPage = require('app/ShaderPage');

    var headerHeight = 50;
    var headerSize = new Transitionable([undefined, 0]);
    var header = new ContainerSurface({
        //classes: ['dropdown-header'],
        size: headerSize,
        content: 'Richard Kopelow',
        properties: {
            background: '#212121',
            color: 'white'
        }
    });

    var buttonWidth = 100;
    var buttons = [];
    var aboutButton = new Surface({
        size: [buttonWidth, undefined],
        content: 'About',
        properties: {
            background: '#e0e0e0',
            color: 'black',
            lineHeight: headerHeight + 'px'
        }
    });
    buttons.push(aboutButton);
    var gamesButton = new Surface({
        size: [buttonWidth, undefined],
        content: 'Games',
        properties: {
            background: '#e0e0e0',
            color: 'black',
            lineHeight: headerHeight + 'px'
        }
    });
    buttons.push(gamesButton);
    var programmingButton = new Surface({
        size: [buttonWidth, undefined],
        content: 'Programming',
        properties: {
            background: '#e0e0e0',
            color: 'black',
            lineHeight: headerHeight + 'px'
        }
    });
    buttons.push(programmingButton);
    var shadersButton = new Surface({
        size: [buttonWidth, undefined],
        content: 'Shaders',
        properties: {
            background: '#e0e0e0',
            color: 'black',
            lineHeight: headerHeight + 'px'
        }
    });
    buttons.push(shadersButton);

    var navigationSpacing = 5;
    var navigationBar = new SequentialLayout({
        size: [buttons.length * buttonWidth + navigationSpacing * buttons.length, undefined],
        origin: [1, 0.5],
        direction: SequentialLayout.DIRECTION.X,
        spacing: navigationSpacing
    });
    header.add({
        align: [1, 0]
    }).add(navigationBar);
    for (var i = 0; i < buttons.length; i++) {
        navigationBar.push(buttons[i]);
        buttons[i].on('click', function () {
            var index = i;
            return function () {
                contentScroll.goTo(index);
            };
        }());
    }

    var sizeButtons = function () {
        var halfSize = (window.innerWidth / 2 - (buttons.length - 1) * navigationSpacing) / buttons.length;
        buttonWidth = 100 < halfSize ? 100 : halfSize;
        buttons.forEach(function (element) {
            element.setSize([buttonWidth, undefined]);
            element.setProperties({
                fontSize: 16/100*buttonWidth +'px'
            });
        navigationBar.setSize([buttons.length * buttonWidth + navigationSpacing * buttons.length, undefined]);
        }, this);
    }
    sizeButtons();

    var footerNormalSize = 25;
    var footerLargeSize = 50;
    var footerSize = new Transitionable([undefined, 0]);
    var footer = new ContainerSurface({
        size: footerSize,
        properties: {
            background: '#212121'
        }
    });
    /*
    footer.on('mouseover', function () {
        footerSize.set([undefined, footerLargeSize], { duration: 1000, curve: 'easeOut' });
    });
    footer.on('mouseout', function () {
        footerSize.set([undefined, footerNormalSize], { duration: 1000, curve: 'easeOut' });
    });
    */
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
    /*
    var substancePage = SubstancePage({
        size: [undefined, 400],
        properties: {
        },
        transitionable: contentScroll.position.map(function (value) {
            return value / (beforeHeights[beforeHeights.length - 1] - scrollHeight);
        })
    });
    pages.push(substancePage);
    */

    var gamesPage = GamePage({
        size: [undefined, 900],
        properties: {
            background: '#03a9f4'
        },
        transitionable: contentScroll.position.map(onScreenMapper(1))
    });
    pages.push(gamesPage);

    var programmingPage = ProgrammingPage({
        size: [undefined, 400],
        transitionable: contentScroll.position.map(onScreenMapper(2))
    });
    pages.push(programmingPage);

    var shaderPage = ShaderPage({
        size: [undefined, 400],
        transitionable: contentScroll.position.map(onScreenMapper(3))
    });
    pages.push(shaderPage);

    for (var i = 0; i <= pages.length; i++) {
        beforeHeights[i] = 0;
        for (var j = 0; j < i; j++) {
            beforeHeights[i] += pages[j].getSize()[1];
        }
    }
    contentScroll.addItems(pages);
    contentScroll.on('resize', function (size) {
        scrollHeight = size[1];
    });

    var layout = new HeaderFooterLayout({
        header: header,
        content: contentScroll,
        footer: footer
    });
    layout.on('resize', function () {
        sizeButtons();
    });

    // Create a Samsara Context as the root of the render tree
    var context = new Context();
    context.add(layout);

    // Mount the context to a DOM element
    context.mount(document.body);

    headerSize.set([undefined, headerHeight], { duration: 1000, curve: 'easeOut' });
    footerSize.set([undefined, footerNormalSize], { duration: 1000, curve: 'easeOut' });
});
