var Parser = require("./Parser.js");

function ColorConfigParser(behaviour) {
	Parser.call(this, behaviour);
}

ColorConfigParser.prototype = Object.create(Parser.prototype);
ColorConfigParser.prototype.constructor = ColorConfigParser;

ColorConfigParser.prototype.write = function(config) {
	config.start = this._writeColor(this._behaviour.colorStart);
	config.end = this._writeColor(this._behaviour.colorEnd);
	config.startVariance = this._writeColor(this._behaviour.colorStartVariance);
	config.endVariance = this._writeColor(this._behaviour.colorEndVariance);
};

ColorConfigParser.prototype.read = function(config) {
	this._behaviour.colorStart = this._readColor(config.start);
	this._behaviour.colorEnd = this._readColor(config.end);
	this._behaviour.colorStartVariance = this._readColor(config.startVariance);
	this._behaviour.colorEndVariance = this._readColor(config.endVariance);
};

module.exports = ColorConfigParser;