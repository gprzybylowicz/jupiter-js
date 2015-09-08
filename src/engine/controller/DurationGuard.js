function DurationGuard() {
	this.maxTime = -1;
	this._elapsedTime = null;

	this.reset();
}

DurationGuard.prototype.isTimeElapsed = function() {
	return this.maxTime > 0 && this._elapsedTime >= this.maxTime;
};

DurationGuard.prototype.update = function(deltaTime) {
	this._elapsedTime += deltaTime;
};

DurationGuard.prototype.reset = function() {
	this._elapsedTime = 0;
};

module.exports = DurationGuard;