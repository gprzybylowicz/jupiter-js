var Behaviour = require("./Behaviour.js");
var BehaviourParser = require("../parser/BehaviourParser.js");

LifeBehaviour.DEFAULT_PRIORITY = 10000;

function LifeBehaviour() {
	Behaviour.call(this);

	this.priority = LifeBehaviour.DEFAULT_PRIORITY;
	this.maxLifeTime = 0;
	this.timeVariance = 0;
}

LifeBehaviour.prototype = Object.create(Behaviour.prototype);
LifeBehaviour.prototype.constructor = LifeBehaviour;

LifeBehaviour.prototype.init = function(particle) {
	particle.lifeTime = 0;
	particle.lifeProgress = 0;

	particle.maxLifeTime = this.maxLifeTime + this.varianceFrom(this.timeVariance);
	particle.maxLifeTime = Math.max(particle.maxLifeTime, 0.0);
};

LifeBehaviour.prototype.apply = function(particle, deltaTime) {
	particle.lifeTime += deltaTime;

	if (particle.maxLifeTime > 0) {
		particle.lifeProgress = particle.lifeTime / particle.maxLifeTime;
	}

};

LifeBehaviour.prototype.getConfigParser = function() {
	return new BehaviourParser(this,"LifeBehaviour");
};

module.exports = LifeBehaviour;