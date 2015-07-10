var ColorBehaviour = require("jupiter").ColorBehaviour;
var BehaviourParser = require("jupiter").BehaviourParser;

describe("ColorBehaviourTest", function() {

	it("getParser return color config parser", function() {
		var behaviour = new ColorBehaviour();
		assert.instanceOf(behaviour.getParser(), BehaviourParser);
	});

});
