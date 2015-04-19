function MathUtil() {
}

MathUtil.EPSILON = 2.220446049250313e-16;

MathUtil.clamp = function(value, min, max) {
	return Math.max(min, Math.min(value, max));
};

MathUtil.areEqual = function(a, b) {
	return Math.abs(a - b) < MathUtil.EPSILON;
};

module.exports = MathUtil;