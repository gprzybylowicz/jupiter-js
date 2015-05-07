var Parser = require("./Parser.js");

function LifeConfigParser(behaviour) {
	Parser.call(this, behaviour);
}

LifeConfigParser.prototype = Object.create(Parser.prototype);
LifeConfigParser.prototype.constructor = LifeConfigParser;

LifeConfigParser.prototype.write = function(config) {
	config.time = this._behaviour.maxLifeTime;
	config.variance = this._behaviour.timeVariance;
};

LifeConfigParser.prototype.read = function(config) {
	this._behaviour.maxLifeTime = config.time || 0;
	this._behaviour.timeVariance = config.variance || 0;
};

module.exports = LifeConfigParser;