define(function (require, exports, module) {
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');

    function Icon(options)
    {
        options = options || {};
        options.tagName = options.tagName || 'img';
        options.attributes = options.attributes || {src: options.src};
        var picture = new Surface(options);
        picture.on('click', options.onClick);

        return picture;
    }
    
    module.exports = Icon;
});