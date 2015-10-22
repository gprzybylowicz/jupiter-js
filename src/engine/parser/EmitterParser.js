var behaviours = require("../behaviour");
var controllers = require("../controller");
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

	config.emitController = this.emitter.emitController.getParser().write();
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

	this.emitter.emitController = this.createEmitController(config.emitController.name);
	this.emitter.emitController.getParser().read(config.emitController);

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
	if (name) {
		return new controllers[name];
	}
	return new controllers.DefaultEmitController();
};

module.exports = EmitterParser;