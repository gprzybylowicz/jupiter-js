var util = require("../util");
var EmitController = require("./EmitController.js");
var EmitControllerNames = require("./EmitControllerNames.js");

function StandardEmitController() {
	EmitController.call(this);

	this._maxParticles = 0;
	this._emissionRate = 0;
	this._emitCounter = 0;
}

util.inherit(StandardEmitController, EmitController);

StandardEmitController.prototype.howMany = function(deltaTime, particlesCount) {
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

Object.defineProperty(StandardEmitController.prototype, "emissionRate", {
	get: function() {
		return this._emissionRate;
	},
	set: function(value) {
		this._emissionRate = Math.max(0, value);
	}
});

Object.defineProperty(StandardEmitController.prototype, "maxParticles", {
	get: function() {
		return this._maxParticles;
	},
	set: function(value) {
		this._maxParticles = Math.max(0, value);
	}
});

StandardEmitController.prototype.reset = function() {
	EmitController.prototype.reset.call(this);
	this._emitCounter = 0;
};

StandardEmitController.prototype.getName = function() {
	return EmitControllerNames.UNIFORM;
};

module.exports = StandardEmitController;