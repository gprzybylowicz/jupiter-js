var RandomEmitControllerTest = require("jupiter").RandomEmitController;
var Random = require("jupiter").Random;

describe("RandomEmitControllerTest", function() {

	it("emissionRate and maxParticles - have default values", function() {
		var controller = new RandomEmitControllerTest();

		assert.equal(controller.emissionRate, 0, "emissionRate should equal 0");
		assert.equal(controller.maxParticles, 0, "maxParticles should equal 0");
	});

	it("emissionRate always greater or equal 0", function() {
		var controller = new RandomEmitControllerTest();

		controller.emissionRate = 10;
		assert.equal(controller.emissionRate, 10, "should equal 10");

		controller.emissionRate = -123;
		assert.equal(controller.emissionRate, 0, "should equal 0");

	});

	it("maxParticles always greater or equal 0", function() {
		var controller = new RandomEmitControllerTest();

		controller.maxParticles = 200;
		assert.equal(controller.maxParticles, 200, "should equal 200");

		controller.maxParticles = -5;
		assert.equal(controller.maxParticles, 0, "should equal 0");
	});

	it("howMany - returns value if there is lack of partilces", function() {
		var stub = sinon.stub(Random, "uniform").returns(10);
		var controller = new RandomEmitControllerTest();
		controller.maxParticles = 200;

		assert.equal(controller.howMany(0, 0), 10);
		stub.restore();
	});

	it("howMany - returns 0 all particles have been generated", function() {
		var stub = sinon.stub(Random, "uniform").returns(10);
		var controller = new RandomEmitControllerTest();
		controller.maxParticles = 200;

		assert.equal(controller.howMany(0, 200), 0);
		stub.restore();
	});

	it("howMany - returns correct value to not overbound limit", function() {
		var stub = sinon.stub(Random, "uniform").returns(10);
		var controller = new RandomEmitControllerTest();
		controller.maxParticles = 12;

		assert.equal(controller.howMany(0, 10), 2);
		stub.restore();
	});
});
