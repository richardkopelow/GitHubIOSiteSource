define(function (require, exports, module) {
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');
    var Transitionable = require('samsara/core/Transitionable');
    var Transform = require('samsara/core/Transform');
    var ScrollPage = require('app/ScrollPage');
    var ProgrammingSlab=require('app/ProgrammingSlab');

    function ProgrammingPage(options) {
        var page = ScrollPage(options);
        //page.setPerspective(100000);

        var testSlab=ProgrammingSlab();
        page.add(testSlab);
        
        return page;
    }

    module.exports = ProgrammingPage;
});