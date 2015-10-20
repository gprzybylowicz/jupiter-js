var DEGREES_MULTIPLIER = Math.PI / 180.0;
var RADIANS_MULTIPLIER = 180 / Math.PI;

module.exports = {
	EPSILON: 2.220446049250313e-16,

	clamp: function(value, min, max) {
		return Math.max(min, Math.min(value, max));
	},

	degreesToRadians: function(degrees) {
		return degrees * DEGREES_MULTIPLIER;
	},

	radiansToDegrees: function(radians) {
		return radians * RADIANS_MULTIPLIER;
	}
};