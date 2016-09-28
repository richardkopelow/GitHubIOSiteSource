define(function (require, exports, module) {
    var Transform = require('samsara/core/Transform');
    var Transitionable = require('samsara/core/Transitionable');
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface=require('samsara/dom/ContainerSurface');

    function IconContainer(options)
    {
        options = options || {};
        options.padding = options.padding || 0;
        options.iconSize = options.iconSize || 50;
        var container = new ContainerSurface(options);
        var transforms=[];

        container.on('resize', function(size){
            var iconsPerRow = Math.floor((size[0] - options.padding)/(options.iconSize+options.padding));
            var justificationBuffer = (size[0]-(options.padding-(options.padding+options.iconSize)*iconsPerRow))/(iconsPerRow+1);
            var iconBuffer = options.padding+justificationBuffer;
            
        });

        container.setIcons = function(iconArray)
        {
            for(var i = 0; i<iconArray.length; i++)
            {

            }
        }

        return container;
    }
    module.exports=IconContainer;
});