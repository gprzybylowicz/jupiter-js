var Behaviour = require("jupiter").Behaviour;
var BehaviourParser = require("jupiter").config.BehaviourParser;

describe("BehaviourTest", function() {

	it("getConfigParser return default parser", function() {
		var behaviour = new Behaviour();
		assert.instanceOf(behaviour.getConfigParser(), BehaviourParser);
	});

});
