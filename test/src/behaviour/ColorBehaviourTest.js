var ColorBehaviour = require("jupiter").ColorBehaviour;
var ColorConfigParser = require("jupiter").config.ColorConfigParser;


describe("ColorBehaviourTest", function() {

	it("getConfigParser return color config parser", function() {
		var behaviour = new ColorBehaviour();
		assert.instanceOf(behaviour.getConfigParser(), ColorConfigParser);
	});
});
