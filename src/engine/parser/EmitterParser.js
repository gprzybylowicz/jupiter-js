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
	config.meta = this.getMetadata();
	return config;
};

EmitterParser.prototype.getMetadata = function() {
	return {jupiter: "1.0.0"};
};

EmitterParser.prototype.read = function(config) {
	var behavioursConfig = config.behaviours;
	var existingBehaviours = this.emitter.behaviours.getAll();
	var alwaysCreate = this.emitter.behaviours.isEmpty();

	this.emitter.behaviours.clear();
	for (var i = 0; i < behavioursConfig.length; i++) {
		var name = behavioursConfig[i].name;
		var behaviour = alwaysCreate ? this.createBehaviour(name) : this.getExistingOrCreate(name, existingBehaviours);
		behaviour.getParser().read(behavioursConfig[i]);
		this.emitter.behaviours.add(behaviour);
	}

	//todo: it's temporaty solution - see above (line 18)
	this.emitter.emitController.maxLife = config.emitController._maxLife;
	this.emitter.emitController.maxParticles = config.emitController._maxParticles;
	this.emitter.emitController.emitPerSecond = config.emitController._emitPerSecond;

	var duration = !!config.emitController._durationGuard ? config.emitController._durationGuard.maxTime : -1;
	this.emitter.emitController.duration = duration;

	return this.emitter;
};

EmitterParser.prototype.getExistingOrCreate = function(name, existingBehaviours) {
	for (var i = 0; i < existingBehaviours.length; i++) {
		if (existingBehaviours[i].getName() === name) {
			return existingBehaviours[i];
		}
	}

	return this.createBehaviour(name);
};

EmitterParser.prototype.createBehaviour = function(name) {
	return new behaviours[name];
};

module.exports = EmitterParser;