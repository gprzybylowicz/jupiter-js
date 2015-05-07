var Parser = require("./Parser.js");

function SizeConfigParser(behaviour) {
	Parser.call(this, behaviour);
}

SizeConfigParser.prototype = Object.create(Parser.prototype);
SizeConfigParser.prototype.constructor = SizeConfigParser;

SizeConfigParser.prototype.write = function(config) {
	config.allowNegativeValues = this._behaviour.allowNegativeValues;
	config.sizeStart = this._writePoint(this._behaviour.sizeStart);
	config.sizeEnd = this._writePoint(this._behaviour.sizeEnd);
	config.startVariance = this._behaviour.startVariance;
	config.endVariance = this._behaviour.endVariance;
};

SizeConfigParser.prototype.read = function(config) {
	this._behaviour.allowNegativeValues = config.allowNegativeValues;
	this._behaviour.sizeStart = this._readPoint(config.sizeStart);
	this._behaviour.sizeEnd = this._readPoint(config.sizeEnd);
	this._behaviour.startVariance = config.startVariance;
	this._behaviour.endVariance = config.endVariance;
};

module.exports = SizeConfigParser;