var EmitController = require("jupiter").EmitController;
var EmitControllerParser = require("jupiter").EmitControllerParser;

describe("EmitControllerTest", function() {

	it("howMany should throw a exception", function() {
		var controller = new EmitController();
		assert.throw(controller.howMany, Error);
	});

	it("default duration is - 1", function() {
		var controller = new EmitController();
		assert.equal(controller.duration, -1, "");
	});

	it("ability to set duration", function() {
		var controller = new EmitController();

		controller.duration = 2;
		assert.equal(controller.duration, 2, "duration equals 2");

		controller.duration = 10;
		assert.equal(controller.duration, 10, "duration equals 10");
	});

	it("shouldn't never end when duration equals -1", function() {
		var controller = new EmitController();
		controller.duration = -1;
		assert.notOk(controller.isEnd());
	});

	it("getName -  should throw a exception", function() {
		var controller = new EmitController();
		assert.throw(controller.getName, Error);
	});

	it("getParser -  should return default parser", function() {
		var controller = new EmitController();
		assert.instanceOf(controller.getParser(), EmitControllerParser);
	});

});
