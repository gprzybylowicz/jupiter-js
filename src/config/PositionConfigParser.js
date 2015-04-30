var Parser = require("./Parser.js");

function PositionConfigParser(behaviour) {
	Parser.call(this, behaviour);
}

PositionConfigParser.prototype = Object.create(Parser.prototype);
PositionConfigParser.prototype.constructor = PositionConfigParser;

PositionConfigParser.prototype.write = function(config) {
	config.position = this._writePoint(this._behaviour.position);
	config.positionVariance = this._writePoint(this._behaviour.positionVariance);
	config.velocity = this._writePoint(this._behaviour.velocity);
	config.velocityVariance = this._writePoint(this._behaviour.velocityVariance);
	config.acceleration = this._writePoint(this._behaviour.acceleration);
	config.accelerationVariance = this._writePoint(this._behaviour.accelerationVariance);
};

PositionConfigParser.prototype.read = function(config) {
	this._behaviour.position = this._readPoint(config.position);
	this._behaviour.positionVariance = this._readPoint(config.positionVariance);
	this._behaviour.velocity = this._readPoint(config.velocity);
	this._behaviour.velocityVariance = this._readPoint(config.velocityVariance);
	this._behaviour.acceleration = this._readPoint(config.acceleration);
	this._behaviour.accelerationVariance = this._readPoint(config.accelerationVariance);
};

module.exports = PositionConfigParser;