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

	particle.radius = particle.radiusStart;
	particle.position.set(0, 0);
	particle.angle = 0;
};

AngularVelocityBehaviour.prototype.apply = function(particle, deltaTime) {
	particle.angle += particle.radiansPerSecond * deltaTime;
	particle.radius = particle.radiusStart + (particle.radiusEnd - particle.radiusStart) * particle.lifeProgress;

	particle.position.x = Math.cos(particle.angle) * particle.radius;
	particle.position.y = Math.sin(particle.angle) * particle.radius;
};
AngularVelocityBehaviour.prototype.getName = function() {
	return "AngularVelocityBehaviour";
};

module.exports = AngularVelocityBehaviour;