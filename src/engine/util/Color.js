var MathUtil = require("./Math.js");

function Color(r, g, b, alpha) {
	this.r = r || 0;
	this.g = g || 0;
	this.b = b || 0;
	this.alpha = alpha;
}

Color.prototype.copyFrom = function(color) {
	this.r = color.r;
	this.g = color.g;
	this.b = color.b;
	this.alpha = color.alpha;
};

Color.prototype.copyFromRawData = function(data) {
	this.r = data._r;
	this.g = data._g;
	this.b = data._b;
	this.alpha = data._alpha;
};

Color.prototype.add = function(color) {
	this.r += color.r;
	this.g += color.g;
	this.b += color.b;
	this.alpha += color.alpha;
};

Color.prototype.set = function(r, g, b, a) {
	this.r = r || 0;
	this.g = g || 0;
	this.b = b || 0;
	this.alpha = a;
};

Object.defineProperty(Color.prototype, "hex", {
	get: function() {
		var hex = this.r << 16;
		hex = hex | this.g << 8;
		hex = hex | this.b;
		return hex;
	},
	set: function(value) {
		this.r = (value & 0xFF0000) >> 16;
		this.g = (value & 0xFF00) >> 8;
		this.b = (value & 0xFF);
	}
});

Object.defineProperty(Color.prototype, "r", {
	get: function() {
		return this._r;
	},
	set: function(value) {
		this._r = MathUtil.clamp(value, 0, 255);
	}
});

Object.defineProperty(Color.prototype, "g", {
	get: function() {
		return this._g;
	},
	set: function(value) {
		this._g = MathUtil.clamp(value, 0, 255);
	}
});

Object.defineProperty(Color.prototype, "b", {
	get: function() {
		return this._b;
	},
	set: function(value) {
		this._b = MathUtil.clamp(value, 0, 255);
	}
});

Object.defineProperty(Color.prototype, "alpha", {
	get: function() {
		return this._alpha;
	},
	set: function(value) {
		value = (value === undefined) ? 1 : value;
		this._alpha = MathUtil.clamp(value, 0, 1);
	}
});

module.exports = Color;