var behaviours = require("../behaviour");

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
	var behaviours = config.behaviours;

};

module.exports = ConfigParser;