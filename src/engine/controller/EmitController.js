var DurationGuard = require("./DurationGuard.js");

function EmitContoller() {
	this._durationGuard = new DurationGuard();
}

EmitContoller.prototype.howMany = function(deltaTime) {
	throw new Error("Abstract method");
};

EmitContoller.prototype.isEnd = function() {
	return this._durationGuard.isTimeElapsed();
};

EmitContoller.prototype.reset = function() {
	this._durationGuard.reset();
};

Object.defineProperty(EmitContoller.prototype, "duration", {
	get: function() {
		return this._durationGuard.maxTime;
	},
	set: function(value) {
		this._durationGuard.maxTime = value;
	}
});

module.exports = EmitContoller;