var Color = require("util/Color");

describe("ColorTest", function() {

	var isEqual = function(source, target) {
		return source.r === target.r && source.g === target.g && source.b === target.b;
	};

	it("constuctor - default", function() {
		var color = new Color();

		assert.equal(color.r, 0);
		assert.equal(color.g, 0);
		assert.equal(color.b, 0);
	});

	it("constuctor - custom r", function() {
		var color = new Color(10);

		assert.equal(color.r, 10);
		assert.equal(color.g, 0);
		assert.equal(color.b, 0);
	});

	it("constuctor - custom rg", function() {
		var color = new Color(10, 20);

		assert.equal(color.r, 10);
		assert.equal(color.g, 20);
		assert.equal(color.b, 0);
	});

	it("constuctor - custom rgb", function() {
		var color = new Color(10, 20, 30);

		assert.equal(color.r, 10);
		assert.equal(color.g, 20);
		assert.equal(color.b, 30);
	});

	it("copyFrom", function() {
		var color = new Color();
		color.copyFrom(new Color(1, 2));

		assert.equal(color.r, 1);
		assert.equal(color.g, 2);
		assert.equal(color.b, 0);
	});

	it("add", function() {
		var color = new Color(5, 5, 5);
		color.add(new Color(1, 2));

		assert.equal(color.r, 6);
		assert.equal(color.g, 7);
		assert.equal(color.b, 5);
	});

	it("hex - from rgb", function() {
		assert.equal(new Color(153, 50, 204).hex, 0x9932CC);
		assert.equal(new Color(123, 104, 238).hex, 0x7B68EE);
		assert.equal(new Color(250, 250, 210).hex, 0xFAFAD2);
	});

	it("hex - to rgb", function() {
		var color = new Color();

		color.hex = 0x9932CC;
		assert.ok(isEqual(color, new Color(153, 50, 204)));

		color.hex = 0x7B68EE;
		assert.ok(isEqual(color, new Color(123, 104, 238)));

		color.hex = 0xFAFAD2;
		assert.ok(isEqual(color, new Color(250, 250, 210)));
	});

	it("overflow protection", function() {
		var color = new Color(500, 200);
		color.g += 200;

		assert.equal(color.r, 255);
		assert.equal(color.g, 255);
		assert.equal(color.b, 0);
	});

	it("uderflow protection", function() {
		var color = new Color(-100, 50);
		color.g -= 200;

		assert.equal(color.r, 0);
		assert.equal(color.g, 0);
		assert.equal(color.b, 0);
	});

});
