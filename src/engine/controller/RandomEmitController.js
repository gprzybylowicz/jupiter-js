var util = require("../util");
var EmitController = require("./EmitController.js");
var EmitControllerNames = require("./EmitControllerNames.js");

function RandomEmitController() {
	EmitController.call(this);

	this._maxParticles = 0;
	this._emissionRate = 0;
}

util.inherit(RandomEmitController, EmitController);

RandomEmitController.prototype.howMany = function(deltaTime, particlesCount) {
	this._durationGuard.update(deltaTime);

	if (particlesCount < this.maxParticles) {
		var count = Math.round(util.Random.uniform(0, Math.ceil(this.emissionRate * deltaTime)));
		var total = particlesCount + count;
		return total > this._maxParticles ? this.maxParticles - particlesCount : count;
	}

	return 0;
};

Object.defineProperty(RandomEmitController.prototype, "emissionRate", {
	get: function() {
		return this._emissionRate;
	},
	set: function(value) {
		this._emissionRate = Math.max(0, value);
	}
});

Object.defineProperty(RandomEmitController.prototype, "maxParticles", {
	get: function() {
		return this._maxParticles;
	},
	set: function(value) {
		this._maxParticles = Math.max(0, value);
	}
});

RandomEmitController.prototype.getName = function() {
	return EmitControllerNames.RANDOM;
};

module.exports = RandomEmitController;