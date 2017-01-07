define(function (require, exports, module) {

    var ContainerSurface = require('samsara/dom/ContainerSurface');
    function ScrollPage(options)
    {
        var page = new ContainerSurface(options);
        page.setProperties({
            overflow : 'hidden'
        });

        page.setTransitionable = function(transitionable) {

        }

        return page;
    }
    module.exports = ScrollPage;
});