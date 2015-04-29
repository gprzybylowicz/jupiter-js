var Parser = require("./Parser.js");

function PositionConfigParser(behaviour) {
	Parser.call(this, behaviour);
}

PositionConfigParser.prototype = Object.create(Parser.prototype);
PositionConfigParser.prototype.constructor = PositionConfigParser;

PositionConfigParser.prototype.write = function(config) {
};

PositionConfigParser.prototype.read = function(config) {
};

module.exports = PositionConfigParser;