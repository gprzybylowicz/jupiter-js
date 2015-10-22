function Duration() {
	this.maxTime = -1;
	this._elapsedTime = null;

	this.reset();
}

Duration.prototype.isTimeElapsed = function() {
	return this.maxTime > 0 && this._elapsedTime >= this.maxTime;
};

Duration.prototype.update = function(deltaTime) {
	this._elapsedTime += deltaTime;
};

Duration.prototype.reset = function() {
	this._elapsedTime = 0;
};

module.exports = Duration;