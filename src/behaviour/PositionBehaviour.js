var Behaviour = require("./Behaviour.js");
var Point = require("../util").Point;
var BehaviourParser = require("../config").BehaviourParser;

PositionBehaviour.DEFAULT_PRIORITY = 100;

function PositionBehaviour() {
	Behaviour.call(this);

	this.priority = PositionBehaviour.DEFAULT_PRIORITY;

	this.position = new Point();
	this.positionVariance = new Point();
	this.velocity = new Point();
	this.velocityVariance = new Point();
	this.acceleration = new Point();
	this.accelerationVariance = new Point();
}

PositionBehaviour.prototype = Object.create(Behaviour.prototype);
PositionBehaviour.prototype.constructor = PositionBehaviour;

PositionBehaviour.prototype.init = function(particle) {
	particle.position.x = this.calculate(this.position.x, this.positionVariance.x);
	particle.position.y = this.calculate(this.position.y, this.positionVariance.y);

	particle.velocity.x = this.calculate(this.velocity.x, this.velocityVariance.x);
	particle.velocity.y = this.calculate(this.velocity.y, this.velocityVariance.y);

	particle.acceleration.x = this.calculate(this.acceleration.x, this.accelerationVariance.x);
	particle.acceleration.y = this.calculate(this.acceleration.y, this.accelerationVariance.y);
};

PositionBehaviour.prototype.calculate = function(value, variance) {
	return value + this.varianceFrom(variance);
};

PositionBehaviour.prototype.apply = function(particle, deltaTime) {
	particle.velocity.x += (particle.acceleration.x * deltaTime);
	particle.velocity.y += (particle.acceleration.y * deltaTime);

	particle.position.x += (particle.velocity.x * deltaTime);
	particle.position.y += (particle.velocity.y * deltaTime);
};

PositionBehaviour.prototype.getConfigParser = function() {
	return new BehaviourParser(this, "PositionBehaviour");
};

module.exports = PositionBehaviour;