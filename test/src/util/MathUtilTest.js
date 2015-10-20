var Math = require("jupiter").Math;

describe("MathUtil", function() {

	function tolerance(precision) {
		if (precision == null) precision = 7;
		return 0.5 * global.Math.pow(10, -precision);
	}

	function almostEqual(a, b, precision, msg) {
		if (precision == null) precision = 7;
		assert.ok(global.Math.abs(a - b) < tolerance(precision), msg);
	}

	it("clamp - no change", function() {
		assert.equal(Math.clamp(0, -10, 10), 0);
	});

	it("clamp - to min", function() {
		assert.equal(Math.clamp(-100, -10, 10), -10);
	});

	it("clamp - to max", function() {
		assert.equal(Math.clamp(99, -10, 10), 10);
	});

	it("degreesToRadians", function() {
		almostEqual(Math.degreesToRadians(45), 0.785398163, 9, "45 degrees to radians");
		almostEqual(Math.degreesToRadians(90), 1.57079633, 8, "90 degrees to radians");
		almostEqual(Math.degreesToRadians(155), 2.70526034, 8, "155 degrees to radians");
	});

	it("radiansToDegrees", function() {
		almostEqual(Math.radiansToDegrees(0.5), 28.6478898, 7, "0.5 radians to degrees");
		almostEqual(Math.radiansToDegrees(2.63), 150.6879, 4, "2.63 radians to degrees");
		almostEqual(Math.radiansToDegrees(7), 401.070457, 6, "7 radians to degrees");
	});
});
