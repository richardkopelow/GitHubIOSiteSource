define(function (require, exports, module) {
    var View = require('samsara/core/View');
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');
    var Transitionable = require('samsara/core/Transitionable');
    var Transform = require('samsara/core/Transform');

    function ProgrammingSlab(options) {
        var view = new View({
            size: [200, 200]
        });
        var flip = new Transitionable(0);
        var flipTransform = flip.map(function (angle) {
            return Transform.rotateY(angle);
        });
        var slabFront = new ContainerSurface({
            origin: [0.5, 0.5],
            content: 'front',
            properties: {
                background: 'grey'
            }
        });
        slabFront.on('mouseover', function () {
            flip.set(Math.PI, { duration: 500 });
        });
        var slabBack = new ContainerSurface({
            origin: [0.5, 0.5],
            content: 'Back',
            properties: {
                background: 'red'
            }
        });
        slabBack.on('mouseout', function () {
            flip.set(0, { duration: 500 });
        });

        var rotationHanger = view.add({
            align: [0.5, 0.5],
            transform: flipTransform
        });

        rotationHanger.add(slabFront);
        rotationHanger.add({ transform: Transform.composeMany(Transform.rotateY(Math.PI), Transform.translate([0, 0, 10])) }).add(slabBack);

        return view;
    }

    module.exports = ProgrammingSlab;
});