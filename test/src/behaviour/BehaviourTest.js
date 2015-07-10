var Behaviour = require("jupiter").Behaviour;
var BehaviourParser = require("jupiter").BehaviourParser;

describe("BehaviourTest", function() {

	it("getParser return default parser", function() {
		var behaviour = new Behaviour();
		assert.instanceOf(behaviour.getParser(), BehaviourParser);
	});

});
