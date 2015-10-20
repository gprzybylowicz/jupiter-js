var Behaviour = require("./Behaviour.js");
var BehaviourNames = require("./BehaviourNames.js");
var util = require("../util");

EmitDirectionBehaviour.DEFAULT_PRIORITY = 0;

var _tmp = 0;

function EmitDirectionBehaviour() {
	Behaviour.call(this);

	this.priority = EmitDirectionBehaviour.DEFAULT_PRIORITY;

	this.angle = 0;
	this.variance = 0;
}

EmitDirectionBehaviour.prototype = Object.create(Behaviour.prototype);
EmitDirectionBehaviour.prototype.constructor = EmitDirectionBehaviour;

EmitDirectionBehaviour.prototype.init = function(particle) {
	var directionAngle = this.angle + this.varianceFrom(this.variance);
	particle.directionCos = Math.cos(directionAngle);
	particle.directionSin = Math.sin(directionAngle);
};

EmitDirectionBehaviour.prototype.apply = function(particle, deltaTime) {
	_tmp = particle.directionCos * particle.x - particle.directionSin * particle.y;
	particle.y = particle.directionSin * particle.x + particle.directionCos * particle.y;
	particle.x = _tmp;
};

Object.defineProperty(EmitDirectionBehaviour.prototype, "angleInDegrees", {
	get: function() {
		return util.Math.radiansToDegrees(this.variance);
	},
	set: function(value) {
		this.angle = util.Math.degreesToRadians(value);
	}
});

Object.defineProperty(EmitDirectionBehaviour.prototype, "varianceInDegrees", {
	get: function() {
		return util.Math.radiansToDegrees(this.variance);
	},
	set: function(value) {
		this.variance = util.Math.degreesToRadians(value);
	}
});

EmitDirectionBehaviour.prototype.getName = function() {
	return BehaviourNames.EMIT_DIRECTION;
};

module.exports = EmitDirectionBehaviour;