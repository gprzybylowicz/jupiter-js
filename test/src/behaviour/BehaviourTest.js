var Behaviour = require("jupiter").Behaviour;
var Parser = require("jupiter").config.Parser;


describe("BehaviourTest", function() {

	it("getConfigParser return default parser", function() {
		var behaviour = new Behaviour();
		assert.instanceOf(behaviour.getConfigParser(), Parser);
	});

});
