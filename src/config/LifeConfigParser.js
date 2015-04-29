var Parser = require("./Parser.js");

function LifeConfigParser(behaviour) {
	Parser.call(this, behaviour);
}

LifeConfigParser.prototype = Object.create(Parser.prototype);
LifeConfigParser.prototype.constructor = LifeConfigParser;

LifeConfigParser.prototype.write = function(config) {
};

LifeConfigParser.prototype.read = function(config) {
};

module.exports = LifeConfigParser;