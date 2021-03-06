var Random = require("../util").Random;
var BehaviourParser = require("../parser/BehaviourParser.js");

function Behaviour() {
	this.priority = 0;

	//Todo: enable
	//Todo: easeing
}

Behaviour.prototype.init = function(particle) {
};

Behaviour.prototype.apply = function(particle, deltaTime) {
};

Behaviour.prototype.varianceFrom = function(value) {
	if (value === 0) return 0;
	return Random.uniform(-1.0, 1.0) * value;
};

Behaviour.prototype.getName = function() {
	throw new Error("This method has to be overridden in subclass");
};

Behaviour.prototype.getParser = function() {
	return new BehaviourParser(this);
};

module.exports = Behaviour;

