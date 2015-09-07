
module.exports = {
	EPSILON: 2.220446049250313e-16,

	clamp: function(value, min, max) {
		return Math.max(min, Math.min(value, max));
	}
};