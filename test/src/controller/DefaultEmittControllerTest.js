var DefaultEmitController = require("jupiter").DefaultEmitController;

describe("DefaultEmitController", function() {

	it("setting emitPerSecond explicity", function() {
		var controller = new DefaultEmitController();
		controller.emitPerSecond = 10;

		assert.equal(controller.emitPerSecond, 10);
	});

	it("emitPerSecond cannont be less than 0", function() {
		var controller = new DefaultEmitController();
		controller.emitPerSecond = -1;

		assert.equal(controller.emitPerSecond, 0);
	});

	it("howMany - maxLife equals 1 sec ", function() {
		var controller = new DefaultEmitController();
		controller.maxParticles = 2;
		controller.maxLife = 1;

		assert.equal(controller.emitPerSecond, 2);
		assert.equal(controller.howMany(0.5), 1);
		assert.equal(controller.howMany(1), 2);
	});


	it("howMany - maxLife equals 2 sec ", function() {
		var controller = new DefaultEmitController();
		controller.maxParticles = 2;
		controller.maxLife = 2;

		assert.equal(controller.emitPerSecond, 1);
		assert.equal(controller.howMany(0.4), 0);
		assert.equal(controller.howMany(1), 1);
	});
});
