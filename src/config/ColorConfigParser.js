var Parser = require("./Parser.js");

function ColorConfigParser(behaviour) {
	Parser.call(this, behaviour);
}

ColorConfigParser.prototype = Object.create(Parser.prototype);
ColorConfigParser.prototype.constructor = ColorConfigParser;

ColorConfigParser.prototype.write = function(config) {
};

ColorConfigParser.prototype.read = function(config) {
};

module.exports = ColorConfigParser;