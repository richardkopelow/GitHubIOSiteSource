define(function (require, exports, module) {
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');

    function Icon(options)
    {
        options = options || {};

        var iconBackground=new ContainerSurface(options);
        var picture = new Surface({
            tagName: 'img',
            size: options.innerSize || options.size,
            attributes: {
                src: options.src}
        });
        if(options.innerSize)
        {
            picture.setSize(options.innerSize);
        }
        picture.setOrigin([0.5, 0.5]);
        picture.on('click', options.onClick);
        iconBackground
            .add({align: [0.5, 0.5]})
            .add(picture);

        return iconBackground;
    }
    
    module.exports = Icon;
});