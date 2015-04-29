var EmitController = require("jupiter").EmitController;

describe("EmitControllerTest", function() {

	it("howMany should throw a exception", function() {
		var controller = new EmitController();
		assert.throw(controller.howMany, Error);
	});
});
