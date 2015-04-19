var MathUtil = require("util/MathUtil");

describe("MathUtil", function() {

	it("clamp - no change", function() {
		assert.equal(MathUtil.clamp(0, -10, 10), 0);
	});

	it("clamp - to min", function() {
		assert.equal(MathUtil.clamp(-100, -10, 10), -10);
	});

	it("clamp - to max", function() {
		assert.equal(MathUtil.clamp(99, -10, 10), 10);
	});
});
