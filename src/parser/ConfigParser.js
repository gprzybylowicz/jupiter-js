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

	//todo: it's temporary solution - emit controller should have dedicated parser
	config.emitController = JSON.parse(JSON.stringify(emitter.emitController));
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

	//todo: it's temporaty solution - see above (line 18)
	emitter.emitController.maxLife = config.emitController._maxLife;
	emitter.emitController.maxParticles = config.emitController._maxParticles;

	return emitter;
};

module.exports = ConfigParser;