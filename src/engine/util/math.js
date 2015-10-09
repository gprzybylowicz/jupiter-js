module.exports = {
	EPSILON: 2.220446049250313e-16,

	clamp: function(value, min, max) {
		return Math.max(min, Math.min(value, max));
	},

	degreesToRadians: function(degrees) {
		return degrees * Math.PI / 180.0;
	}
};