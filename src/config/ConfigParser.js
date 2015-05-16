
var behaviours = require("../behaviour");

function ConfigParser() {

}

ConfigParser.prototype.write = function(emitter) {
	var config = {behaviours: []};
	var emitterBehavious = emitter.getBehaviours();

	console.log(JSON.stringify(emitterBehavious));

	for(var name in behaviours){

	}

	return config;
};

ConfigParser.prototype.read = function(config) {
	var behaviours = config.behaviours;

};

module.exports = ConfigParser;