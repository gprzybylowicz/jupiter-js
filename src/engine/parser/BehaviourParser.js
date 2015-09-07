var Point = require("../util").Point;
var Color = require("../util").Color;

function BehaviourParser(behaviour) {
	this._behaviour = behaviour;
}

BehaviourParser.prototype.write = function() {
	var config = JSON.parse(JSON.stringify(this._behaviour));
	config.name = this._behaviour.getName();
	return config;
};

BehaviourParser.prototype.read = function(config) {
	for (var key in config) {
		if (this._behaviour[key] instanceof Object) {
			this._behaviour[key].copyFromRawData(config[key]);
		}
		else {
			this._behaviour[key] = config[key];
		}
	}
};

BehaviourParser.prototype._writePoint = function(point) {
	return {x: point.x, y: point.y};
};

BehaviourParser.prototype._readPoint = function(rawData) {
	var point = new Point();
	if (rawData) {
		point.x = rawData.x || 0;
		point.y = rawData.y || 0;
	}
	return point;
};

BehaviourParser.prototype._writeColor = function(color) {
	return {hex: color.hex, alpha: color.alpha};
};

BehaviourParser.prototype._readColor = function(rawData) {
	var color = new Color();
	if (rawData) {
		color.hex = rawData.hex || 0;
		color.alpha = rawData.alpha || 0;
	}
	return color;
};

module.exports = BehaviourParser;