define(function (require, exports, module) {
    var Transform = require('samsara/core/Transform');
    var Transitionable = require('samsara/core/Transitionable');
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');
    var Icon = require('./Icon');

    function IconContainer(options)
    {
        options = options || {};
        options.padding = options.padding || 0;
        options.iconSize = options.iconSize || 50;
        var container = new ContainerSurface(options);
        var transforms=[];

        function positionIcons(size, duration)
        {
            var iconsPerRow = Math.floor((size[0] - options.padding)/(options.iconSize+options.padding));
            if(iconsPerRow>transforms.length)
            {
                iconsPerRow = transforms.length;
            }
            var justificationBuffer = (size[0]-(options.padding+(options.padding+options.iconSize)*iconsPerRow))/(iconsPerRow+1);
            if(justificationBuffer>10)
            {
                justificationBuffer = 10;
            }
            var iconBuffer = options.padding+justificationBuffer;
            var rowWidth = iconBuffer+(iconBuffer+options.iconSize)*iconsPerRow;
            var columnHeight = (Math.floor((transforms.length-1)/iconsPerRow)+1)*(options.padding+options.iconSize);

            for(var i = 0; i < transforms.length; i++)
            {
                var row = Math.floor(i / iconsPerRow);
                var column = i-row*iconsPerRow;

                transforms[i].set([(iconBuffer+options.iconSize)*column+iconBuffer-rowWidth/2, (options.padding+options.iconSize)*row+options.padding-columnHeight/2, 0], {duration: duration, curve: 'easeOut'});
            }
        }
        function collapseIcons(duration)
        {
            for(var i = 0; i < transforms.length; i++)
            {
                transforms[i].set([0, 0, 0], {duration: duration, curve: 'easeOut'});
            }
        }

        container.on('resize', function(size){
            positionIcons(size, 500);
            
        });

        container.setIcons = function(iconArray)
        {
            for(var i = 0; i<iconArray.length; i++)
            {
                var trans = new Transitionable([0, 0, 0]);
                var icon = new Icon({
                    size: [options.iconSize, options.iconSize],
                    src: iconArray[i].src
                });
                container
                    .add({
                        align: [0.5,0.5],
                        transform: trans.map(function(pos){return Transform.translate(pos);}),
                    })
                    .add(icon);

                transforms.push(trans);
            }
            positionIcons(container.size);
        }

        return container;
    }
    module.exports=IconContainer;
});