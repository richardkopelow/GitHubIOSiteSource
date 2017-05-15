define(function (require, exports, module) {
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');
    var Transitionable = require('samsara/core/Transitionable');
    var Transform = require('samsara/core/Transform');
    var ScrollPage = require('app/ScrollPage');
    var ProgrammingSlab=require('app/ProgrammingSlab');

    function ProgrammingPage(options) {
        var page = ScrollPage(options);
        var alpha = 0;
        var targetSize = [window.innerWidth / 3, options.size[1] * 0.8];

        var slabScale = options.transitionable.map(function (value){
            alpha = value;
            return Transform.scale([value, value, 1]);//[targetSize[0] * alpha, targetSize[1] * alpha];
        });

        var title = new Surface({
            size: [undefined, options.size[1] * 0.2],
            content: '<hx>Programming</hx>',
            origin: [0.5, 0.5],
            properties: {
                textAlign: 'center',
                background: 'grey',
                lineHeight: options.size[1] * 0.2 + 'px'
            }
        });
        page.add({
            align: [0.5, 0.1],
            transform: slabScale
        }).add(title);

        var generatorSamsara = ProgrammingSlab({
            size: targetSize,
            text: 'generator-samsara is a Yeoman generator for the Samsara javascript framework. It can be used with Yeoman to generate boilerplate projects based off of any of the Samsara demo projects. The projects are set up with a live reload dev server and tools to package your site for deployment',
            icon: 'assets/Icons/GeneratorSamsara.png',
            url: 'https://github.com/richardkopelow/generator-samsara',
            properties: {
                background: 'grey'
            }
        });
        page.add({
            align: [1/6, 0.6],
            transform: slabScale
        }).add(generatorSamsara);

        var highImperialTranslator = ProgrammingSlab({
            size: targetSize,
            text: 'High Imperial Translator is a website I made that translated English to High Imperial (Eastern Street Slang), a giberish language from Brandon Sanderson\'s Mistborn series.',
            icon: 'assets/Icons/Tin.png',
            url: 'http://highimperialtranslator.com',
            properties: {
                background: 'grey'
            }
        });
        page.add({
            align: [0.5, 0.6],
            transform: slabScale
        }).add(highImperialTranslator);

        var gac = ProgrammingSlab({
            size: targetSize,
            text: 'GAC (Generic Avatar Creator) is a tool for Unity that lets you create custom characters based on a base mesh. Once the "DNA" for a character is setup, modifying the character is as easy as setting its "Height", "Foot Size", or any other attribute you setup. Character modification can be done live, and equipment can be hotswaped as well. GAC can be configured to work with any skeleton, not just human ones, so it can be used with humans, dogs, centaurs, or anything else.',
            icon: 'assets/Icons/GAC.png',
            url: 'https://github.com/richardkopelow/GAC',
            properties: {
                background: 'grey'
            }
        });
        page.add({
            align: [5/6, 0.6],
            transform: slabScale
        }).add(gac);

        page.on('resize', function (size) {
            targetSize = [size[0] / 3, options.size[1] * 0.8];
            generatorSamsara.setSize(targetSize);
            highImperialTranslator.setSize(targetSize);
            gac.setSize(targetSize);
        });
        
        return page;
    }

    module.exports = ProgrammingPage;
});