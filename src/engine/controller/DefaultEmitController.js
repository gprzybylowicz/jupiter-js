function DefaultEmitContoller() {
	this._maxParticles = 0;
	this._maxLife = 1;
	this._emitPerSecond = 0;
	this._frames = 0;
}

DefaultEmitContoller.prototype.howMany = function(deltaTime) {
	var ratio = this._emitPerSecond * deltaTime;
	this._frames += ratio;

	var numberToEmit = 0;
	if (this._frames >= 1.0) {
		numberToEmit = Math.round(this._frames);
		this._frames = 0;
	}
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

module.exports = DefaultEmitContoller;