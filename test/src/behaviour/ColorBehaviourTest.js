var ColorBehaviour = require("jupiter").ColorBehaviour;
var BehaviourParser = require("jupiter").config.BehaviourParser;

describe("ColorBehaviourTest", function() {

	it("getConfigParser return color config parser", function() {
		var behaviour = new ColorBehaviour();
		assert.instanceOf(behaviour.getConfigParser(), BehaviourParser);
	});

});
