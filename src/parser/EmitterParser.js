var behaviours = require("../behaviour");
var Emitter = require("../emitter").Emitter;

function EmitterParser(emitter) {
	this.emitter = emitter;
}

EmitterParser.prototype.write = function() {
	var config = {behaviours: []};
	var emitterBehavious = this.emitter.behaviours.getAll();

	for (var i = 0; i < emitterBehavious.length; i++) {
		var behaviourConfig = emitterBehavious[i].getParser().write();
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
		var name = behavioursConfig[i].name;
		var behaviour = alwaysCreate ? this.createBehaviour(name) : this.getExistingOrCreate(name);
		behaviour.getParser().read(behavioursConfig[i]);
	}

	//todo: it's temporaty solution - see above (line 18)
	this.emitter.emitController.maxLife = config.emitController._maxLife;
	this.emitter.emitController.maxParticles = config.emitController._maxParticles;
	this.emitter.emitController.emitPerSecond = config.emitController._emitPerSecond;

	return this.emitter;
};

EmitterParser.prototype.getExistingOrCreate = function(name) {
	var behaviours = this.emitter.behaviours.getAll();
	for (var i = 0; i < behaviours.length; i++) {
		if (behaviours[i].getName() === name) {
			return behaviours[i];
		}
	}

	return this.createBehaviour(name);
};

EmitterParser.prototype.createBehaviour = function(name) {
	return this.emitter.behaviours.add(new behaviours[name]);
};

module.exports = EmitterParser;