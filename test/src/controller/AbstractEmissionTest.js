var AbstractEmission = require("jupiter").AbstractEmission;
var EmitControllerParser = require("jupiter").EmitControllerParser;

describe("AbstractEmissionTest", function() {

	it("howMany should throw a exception", function() {
		var controller = new AbstractEmission();
		assert.throw(controller.howMany, Error);
	});

	it("getName -  should throw a exception", function() {
		var controller = new AbstractEmission();
		assert.throw(controller.getName, Error);
	});

	it("getParser -  should return default parser", function() {
		var controller = new AbstractEmission();
		assert.instanceOf(controller.getParser(), EmitControllerParser);
	});

});
