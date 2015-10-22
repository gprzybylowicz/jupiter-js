var util = require("../util");
var AbstractEmission = require("./AbstractEmission.js");
var EmissionTypes = require("./EmissionTypes.js");

function RandomEmission() {
	AbstractEmission.call(this);

	this._maxParticles = 0;
	this._emissionRate = 0;
}

util.inherit(RandomEmission, AbstractEmission);

RandomEmission.prototype.howMany = function(deltaTime, particlesCount) {
	if (particlesCount < this.maxParticles) {
		var count = Math.round(util.Random.uniform(0, Math.ceil(this.emissionRate * deltaTime)));
		var total = particlesCount + count;
		return total > this._maxParticles ? this.maxParticles - particlesCount : count;
	}

	return 0;
};

Object.defineProperty(RandomEmission.prototype, "emissionRate", {
	get: function() {
		return this._emissionRate;
	},
	set: function(value) {
		this._emissionRate = Math.max(0, value);
	}
});

Object.defineProperty(RandomEmission.prototype, "maxParticles", {
	get: function() {
		return this._maxParticles;
	},
	set: function(value) {
		this._maxParticles = Math.max(0, value);
	}
});

RandomEmission.prototype.getName = function() {
	return EmissionTypes.RANDOM;
};

module.exports = RandomEmission;