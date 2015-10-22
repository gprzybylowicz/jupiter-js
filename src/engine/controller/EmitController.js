var DurationGuard = require("./DurationGuard.js");
var EmitControllerParser = require("../parser/EmitControllerParser.js");

function EmitContoller() {
	this._durationGuard = new DurationGuard();
}

EmitContoller.prototype.howMany = function(deltaTime, particlesCount) {
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

EmitContoller.prototype.getName = function() {
	throw new Error("This method has to be overridden in subclass");
};

EmitContoller.prototype.getParser = function() {
	return new EmitControllerParser(this);
};

module.exports = EmitContoller;