var behaviours = require("../behaviour");
var Emitter = require("../emitter").Emitter;

function ConfigParser() {

}

ConfigParser.prototype.write = function(emitter) {
	var config = {behaviours: []};
	var emitterBehavious = emitter.behaviours.getAll();

	for (var i = 0; i < emitterBehavious.length; i++) {
		var behaviourConfig = {};
		emitterBehavious[i].getConfigParser().write(behaviourConfig);
		config.behaviours.push(behaviourConfig);
	}

	return config;
};

ConfigParser.prototype.read = function(config) {
	var emitter = new Emitter();
	var emitterBehavious = config.behaviours;

	for (var i = 0; i < emitterBehavious.length; i++) {
		var behaviourClass = behaviours[emitterBehavious[i].type];

		var behaviour = new behaviourClass();
		behaviour.getConfigParser().read(emitterBehavious[i]);
		emitter.behaviours.add(behaviour);
	}

	return emitter;
};

module.exports = ConfigParser;