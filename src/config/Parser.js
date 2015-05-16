var Point = require("../util").Point;
var Color = require("../util").Color;

function Parser(behaviour, type) {
	this._behaviour = behaviour;
	this._type = type;
}

Parser.prototype.write = function(config) {
	config[this._type] = JSON.stringify(this._behaviour);
};

Parser.prototype.read = function(config) {
	var data = JSON.parse(config);
	for (var key in data) {
		if (this._behaviour[key] instanceof Object) {
			this._behaviour[key].copyFrom(data[key]);
		}
		else {
			this._behaviour[key] = data[key];
		}
	}
};

Parser.prototype._writePoint = function(point) {
	return {x: point.x, y: point.y};
};

Parser.prototype._readPoint = function(rawData) {
	var point = new Point();
	if (rawData) {
		point.x = rawData.x || 0;
		point.y = rawData.y || 0;
	}
	return point;
};

Parser.prototype._writeColor = function(color) {
	return {hex: color.hex, alpha: color.alpha};
};

Parser.prototype._readColor = function(rawData) {
	var color = new Color();
	if (rawData) {
		color.hex = rawData.hex || 0;
		color.alpha = rawData.alpha || 0;
	}
	return color;
};

module.exports = Parser;