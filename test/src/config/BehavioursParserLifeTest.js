var LifeBehaviour = require("jupiter").LifeBehaviour;

describe("BehaviourParserLifeTest", function() {

	var TARGET_CONFIG = {
		name: "LifeBehaviour",
		priority: LifeBehaviour.DEFAULT_PRIORITY,
		maxLifeTime: 1234,
		timeVariance: 100

	};

	it("write", function() {
		var behaviour = new LifeBehaviour();
		behaviour.maxLifeTime = 1234;
		behaviour.timeVariance = 100;

		var config = behaviour.getParser().write();
		assert.deepEqual(config, TARGET_CONFIG);
	});

	it("read", function() {
		var behaviour = new LifeBehaviour();

		behaviour.getParser().read(TARGET_CONFIG);
		assert.equal(behaviour.maxLifeTime, 1234);
		assert.equal(behaviour.timeVariance, 100);
	});

});
