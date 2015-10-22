var EmitControllerParser = require("../parser/EmitControllerParser.js");

function AbstractEmission() {
}

AbstractEmission.prototype.howMany = function(deltaTime, particlesCount) {
	throw new Error("Abstract method");
};

AbstractEmission.prototype.reset = function() {
};

AbstractEmission.prototype.getName = function() {
	throw new Error("This method has to be overridden in subclass");
};

AbstractEmission.prototype.getParser = function() {
	return new EmitControllerParser(this);
};

module.exports = AbstractEmission;