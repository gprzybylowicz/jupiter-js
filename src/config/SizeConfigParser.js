var Parser = require("./Parser.js");

function SizeConfigParser(behaviour) {
	Parser.call(this, behaviour);
}

SizeConfigParser.prototype = Object.create(Parser.prototype);
SizeConfigParser.prototype.constructor = SizeConfigParser;

SizeConfigParser.prototype.write = function(config) {
};

SizeConfigParser.prototype.read = function(config) {
};

module.exports = SizeConfigParser;