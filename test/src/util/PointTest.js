var Point = require("jupiter").Point;

describe("PointTest", function() {

	it("constuctor - default", function() {
		var point = new Point();

		assert.equal(point.x, 0);
		assert.equal(point.y, 0);
	});

	it("constuctor - custom params", function() {
		var point = new Point(10, 50);

		assert.equal(point.x, 10);
		assert.equal(point.y, 50);
	});

	it("set - only x value", function() {
		var point = new Point(10, 50);
		point.set(99);

		assert.equal(point.x, 99);
		assert.equal(point.y, 50);
	});

	it("set", function() {
		var point = new Point(22, 54);
		point.set(99, 0);

		assert.equal(point.x, 99);
		assert.equal(point.y, 0);
	});

	it("copyFrom", function() {
		var point = new Point(44, 42);
		point.copyFrom(new Point(1, 2));

		assert.equal(point.x, 1);
		assert.equal(point.y, 2);
	});

	it("multiplyByScalar", function() {
		var point = new Point(5, 10);
		point.multiplayByScalar(5);

		assert.equal(point.x, 25);
		assert.equal(point.y, 50);
	});

	it("add", function() {
		var point = new Point(5, 10);
		point.add(new Point(3, 3));

		assert.equal(point.x, 8);
		assert.equal(point.y, 13);
	});

});
