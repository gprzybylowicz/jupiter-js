var Behaviour = require("./Behaviour.js");
var BehaviourNames = require("./BehaviourNames.js");
var util = require("../util");

RotationBehaviour.DEFAULT_PRIORITY = 0;

function RotationBehaviour() {
	Behaviour.call(this);

	this.priority = RotationBehaviour.DEFAULT_PRIORITY;

	this.rotation = 0;
	this.variance = 0;
}

RotationBehaviour.prototype = Object.create(Behaviour.prototype);
RotationBehaviour.prototype.constructor = RotationBehaviour;

RotationBehaviour.prototype.init = function(particle) {
	particle.rotationDelta = this.rotation + this.varianceFrom(this.variance);
};

RotationBehaviour.prototype.apply = function(particle, deltaTime) {
	particle.rotation += (particle.rotationDelta * deltaTime);
};

Object.defineProperty(RotationBehaviour.prototype, "rotationInDegrees", {
	get: function() {
		return util.Math.radiansToDegrees(this.variance);
	},
	set: function(value) {
		this.rotation = util.Math.degreesToRadians(value);
	}
});

Object.defineProperty(RotationBehaviour.prototype, "varianceInDegrees", {
	get: function() {
		return util.Math.radiansToDegrees(this.variance);
	},
	set: function(value) {
		this.variance = util.Math.degreesToRadians(value);
	}
});

RotationBehaviour.prototype.getName = function() {
	return BehaviourNames.ROTATION_BEHAVIOUR;
};

module.exports = RotationBehaviour;

