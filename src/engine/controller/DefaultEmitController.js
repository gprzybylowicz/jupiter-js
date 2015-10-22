var util = require("../util");
var EmitController = require("./EmitController.js");
var EmitControllerNames = require("./EmitControllerNames.js");

function DefaultEmitContoller() {
	EmitController.call(this);

	this._maxParticles = 0;
	this._maxLife = 1;
	this._emitPerSecond = 0;
	this._frames = 0;
}

util.inherit(DefaultEmitContoller, EmitController);

DefaultEmitContoller.prototype.howMany = function(deltaTime, particlesCount) {
	var ratio = this._emitPerSecond * deltaTime;
	this._frames += ratio;

	var numberToEmit = 0;
	if (this._frames >= 1.0) {
		numberToEmit = Math.round(this._frames);
		this._frames = 0;
	}

	this._durationGuard.update(deltaTime);
	return numberToEmit;
};

DefaultEmitContoller.prototype.refresh = function() {
	this.emitPerSecond = this._maxParticles / this._maxLife;
};

Object.defineProperty(DefaultEmitContoller.prototype, "maxLife", {
	set: function(value) {
		this._maxLife = Math.max(value, 1);
		this.refresh();
	}
});

Object.defineProperty(DefaultEmitContoller.prototype, "maxParticles", {
	set: function(value) {
		this._maxParticles = Math.max(value, 0);
		this.refresh();
	}
});

Object.defineProperty(DefaultEmitContoller.prototype, "emitPerSecond", {
	get: function() {
		return this._emitPerSecond;
	},
	set: function(value) {
		this._emitPerSecond = Math.max(value, 0);
	}
});

DefaultEmitContoller.prototype.getName = function() {
	return EmitControllerNames.DEFAULT;
};

module.exports = DefaultEmitContoller;