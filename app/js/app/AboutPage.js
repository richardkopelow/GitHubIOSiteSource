define(function (require, exports, module) {
    var Surface = require('samsara/dom/Surface');
    var Transitionable = require('samsara/core/Transitionable');
    var Transform = require('samsara/core/Transform');
    var ScrollPage = require('app/ScrollPage');

    function AboutPage(options) {
        var page = ScrollPage(options);

        var aboutHeader = new Surface({
            content: '<h2>About Me</h2>',
            opacity: options.transitionable,
            properties: {
                paddingLeft: '50px'
            }
        });
        var aboutText = new Surface({
            tagName: 'p',
            content: 'I\'m Richard Kopelow, I am an undergraduate Computer Engineering major at Stevens Institute of Technology. I am a programmer and a member of the Stevens Game Development Club. I love VR development. This is a place where you can find some of my stuff.',
            opacity: options.transitionable,
            properties: {
                paddingTop: '65px',
                paddingBottom: '50px',
                paddingLeft: '50px',
                paddingRight: '50px'
            }
        });
        page.add(aboutHeader);
        page
            .add({ transform: Transform.translate([0, 0, 0]) })
            .add(aboutText);

        return page;
    }

    module.exports = AboutPage;
});