var Parser = require("./Parser.js");

function LifeConfigParser(behaviour) {
	Parser.call(this, behaviour);
}

LifeConfigParser.prototype = Object.create(Parser.prototype);
LifeConfigParser.prototype.constructor = LifeConfigParser;

LifeConfigParser.prototype.write = function(config) {
	config.maxLifeTime = this._behaviour.maxLifeTime;
	config.timeVariance = this._behaviour.maxLifeTime;
};

LifeConfigParser.prototype.read = function(config) {
	this._behaviour.maxLifeTime = config.maxLifeTime || 0;
	this._behaviour.timeVariance = config.maxLifeTime || 0;
};

module.exports = LifeConfigParser;