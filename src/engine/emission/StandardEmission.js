var util = require("../util");
var AbstractEmission = require("./AbstractEmission.js");
var EmissionTypes = require("./EmissionTypes.js");

function StandardEmission() {
	AbstractEmission.call(this);

	this._maxParticles = 0;
	this._emissionRate = 0;
	this._emitCounter = 0;
}

util.inherit(StandardEmission, AbstractEmission);

StandardEmission.prototype.howMany = function(deltaTime, particlesCount) {
	var rate = 1.0 / this.emissionRate;
	var count = 0;
	if (particlesCount < this.maxParticles) {
		this._emitCounter += deltaTime;
	}

	while (particlesCount < this.maxParticles && this._emitCounter > rate) {
		count++;
		this._emitCounter -= rate;
	}

	return count;
};

Object.defineProperty(StandardEmission.prototype, "emissionRate", {
	get: function() {
		return this._emissionRate;
	},
	set: function(value) {
		this._emissionRate = Math.max(0, value);
	}
});

Object.defineProperty(StandardEmission.prototype, "maxParticles", {
	get: function() {
		return this._maxParticles;
	},
	set: function(value) {
		this._maxParticles = Math.max(0, value);
	}
});

StandardEmission.prototype.reset = function() {
	AbstractEmission.prototype.reset.call(this);
	this._emitCounter = 0;
};

StandardEmission.prototype.getName = function() {
	return EmissionTypes.UNIFORM;
};

module.exports = StandardEmission;