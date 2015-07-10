var behaviours = require("../behaviour");
var Emitter = require("../emitter").Emitter;

function EmitterParser(emitter) {
	this.emitter = emitter;
}

EmitterParser.prototype.write = function() {
	var config = {behaviours: []};
	var emitterBehavious = this.emitter.behaviours.getAll();

	for (var i = 0; i < emitterBehavious.length; i++) {
		var behaviourConfig = emitterBehavious[i].getConfigParser().write();
		config.behaviours.push(behaviourConfig);
	}

	//todo: it's temporary solution - emit controller should have dedicated parser
	config.emitController = JSON.parse(JSON.stringify(this.emitter.emitController));
	return config;
};

EmitterParser.prototype.read = function(config) {
	var behavioursConfig = config.behaviours;
	var alwaysCreate = this.emitter.behaviours.isEmpty();

	for (var i = 0; i < behavioursConfig.length; i++) {
		var type = behavioursConfig[i].type;
		var behaviour = alwaysCreate ? this.createBehaviour(type) : this.getExistingOrCreate(type);
		behaviour.getConfigParser().read(behavioursConfig[i]);
	}

	//todo: it's temporaty solution - see above (line 18)
	this.emitter.emitController.maxLife = config.emitController._maxLife;
	this.emitter.emitController.maxParticles = config.emitController._maxParticles;
	this.emitter.emitController.emitPerSecond = config.emitController._emitPerSecond;

	return this.emitter;
};

EmitterParser.prototype.getExistingOrCreate = function(type) {
	var behaviours = this.emitter.behaviours.getAll();
	for (var i = 0; i < behaviours.length; i++) {
		if (behaviours[i].type === type) {
			return behaviours[i];
		}
	}

	return this.createBehaviour(type);
};

EmitterParser.prototype.createBehaviour = function(type) {
	return this.emitter.behaviours.add(new behaviours[type]);
};

module.exports = EmitterParser;