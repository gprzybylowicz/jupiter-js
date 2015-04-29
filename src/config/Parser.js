function Parser(behaviour) {
	this._behaviour = behaviour;
}

Parser.prototype.write = function(config) {
	console.warn("Default Parse doesn't write config");
};

Parser.prototype.read = function(config) {
	console.warn("Default Parse doesn't read config");
};

module.exports = Parser;