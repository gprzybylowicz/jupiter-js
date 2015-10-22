function EmitControllerParser(controller) {
	this._controller = controller;
}

EmitControllerParser.prototype.write = function() {
	var config = JSON.parse(JSON.stringify(this._controller));
	config.name = this._controller.getName();
	return config;
};

EmitControllerParser.prototype.read = function(config) {
	for (var key in config) {
		if (!(this._controller[key] instanceof Object)) {
			this._controller[key] = config[key];
		}
	}

	var duration = !!config._durationGuard ? config._durationGuard.maxTime : -1;
	this._controller.duration = duration;
};

module.exports = EmitControllerParser;