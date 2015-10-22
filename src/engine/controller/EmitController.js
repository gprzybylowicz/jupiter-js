var EmitControllerParser = require("../parser/EmitControllerParser.js");

function EmitContoller() {
}

EmitContoller.prototype.howMany = function(deltaTime, particlesCount) {
	throw new Error("Abstract method");
};

EmitContoller.prototype.reset = function() {
};

EmitContoller.prototype.getName = function() {
	throw new Error("This method has to be overridden in subclass");
};

EmitContoller.prototype.getParser = function() {
	return new EmitControllerParser(this);
};

module.exports = EmitContoller;