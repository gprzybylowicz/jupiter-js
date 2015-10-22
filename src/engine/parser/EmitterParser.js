var behaviours = require("../behaviour");
var emissions = require("../emission");
var Emitter = require("../emitter").Emitter;
var CompatibilityHelper = require("./CompatibilityHelper.js");

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

	config.emitController = this.emitter.emitController.getParser().write();
	config.duration = this.emitter.duration.maxTime;
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

	this.emitter.emitController = this.createEmitController(config.emitController.name || emissions.EmissionTypes.DEFAULT);
	this.emitter.emitController.getParser().read(config.emitController);
	this.emitter.duration.maxTime = CompatibilityHelper.readDuration(config);

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

EmitterParser.prototype.createEmitController = function(name) {
	return new emissions[name];
};

module.exports = EmitterParser;