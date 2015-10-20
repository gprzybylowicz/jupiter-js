var Behaviour = require("./Behaviour.js");
var util = require("../util");

AngularVelocityBehaviour.DEFAULT_PRIORITY = 100;

function AngularVelocityBehaviour() {
	Behaviour.call(this);

	this.priority = AngularVelocityBehaviour.DEFAULT_PRIORITY;

	this.degrees = 0;
	this.degreesVariance = 0;
	this.maxRadius = 0;
	this.maxRadiusVariance = 0;
	this.minRadius = 0;
	this.minRadiusVariance = 0;
}

AngularVelocityBehaviour.prototype = Object.create(Behaviour.prototype);
AngularVelocityBehaviour.prototype.constructor = AngularVelocityBehaviour;

AngularVelocityBehaviour.prototype.init = function(particle) {
	particle.radiansPerSecond = util.Math.degreesToRadians(this.degrees + this.varianceFrom(this.degreesVariance));
	particle.radiusStart = this.maxRadius + this.varianceFrom(this.maxRadiusVariance);
	particle.radiusEnd = this.minRadius + this.varianceFrom(this.minRadiusVariance);

	particle.x = 0;
	particle.y = 0;
	particle.radius = particle.radiusStart;
	particle.angle = 0;
};

AngularVelocityBehaviour.prototype.apply = function(particle, deltaTime) {
	particle.angle += particle.radiansPerSecond * deltaTime;
	particle.radius = particle.radiusStart + (particle.radiusEnd - particle.radiusStart) * particle.lifeProgress;

	particle.movement.x = Math.cos(particle.angle) * particle.radius;
	particle.movement.y = Math.sin(particle.angle) * particle.radius;

	particle.x = particle.movement.x;
	particle.y = particle.movement.y;
};

AngularVelocityBehaviour.prototype.getName = function() {
	return "AngularVelocityBehaviour";
};

module.exports = AngularVelocityBehaviour;