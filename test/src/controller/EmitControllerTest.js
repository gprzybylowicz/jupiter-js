var EmitController = require("jupiter").EmitController;
var EmitControllerParser = require("jupiter").EmitControllerParser;

describe("EmitControllerTest", function() {

	it("howMany should throw a exception", function() {
		var controller = new EmitController();
		assert.throw(controller.howMany, Error);
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
