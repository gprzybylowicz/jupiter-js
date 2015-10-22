var util = require("../util");
var AbstractEmission = require("./AbstractEmission.js");
var EmissionTypes = require("./EmissionTypes.js");

function UniformEmission() {
	AbstractEmission.call(this);

	this._maxParticles = 0;
	this._maxLife = 1;
	this._emitPerSecond = 0;
	this._frames = 0;
}

util.inherit(UniformEmission, AbstractEmission);

UniformEmission.prototype.howMany = function(deltaTime, particlesCount) {
	var ratio = this._emitPerSecond * deltaTime;
	this._frames += ratio;

	var numberToEmit = 0;
	if (this._frames >= 1.0) {
		numberToEmit = Math.round(this._frames);
		this._frames = 0;
	}

	return numberToEmit;
};

UniformEmission.prototype.refresh = function() {
	this.emitPerSecond = this._maxParticles / this._maxLife;
};

Object.defineProperty(UniformEmission.prototype, "maxLife", {
	set: function(value) {
		this._maxLife = Math.max(value, 1);
		this.refresh();
	}
});

Object.defineProperty(UniformEmission.prototype, "maxParticles", {
	set: function(value) {
		this._maxParticles = Math.max(value, 0);
		this.refresh();
	}
});

Object.defineProperty(UniformEmission.prototype, "emitPerSecond", {
	get: function() {
		return this._emitPerSecond;
	},
	set: function(value) {
		this._emitPerSecond = Math.max(value, 0);
	}
});

UniformEmission.prototype.getName = function() {
	return EmissionTypes.DEFAULT;
};

module.exports = UniformEmission;