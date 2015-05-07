var LifeBehaviour = require("jupiter").LifeBehaviour;
var LifeConfigParser = require("jupiter").config.LifeConfigParser;

describe("LifeBehaviourParserTest", function() {
	it("write", function() {
		var behaviour = new LifeBehaviour();
		behaviour.maxLifeTime = 1234;
		behaviour.timeVariance = 100;

		var target = {
			time: 1234,
			variance: 100
		};

		var config = {};
		new LifeConfigParser(behaviour).write(config);
		assert.deepEqual(config, target);
	});

	it("read", function() {
		var behaviour = new LifeBehaviour();

		var config = {
			time: 888,
			variance: 111
		};

		new LifeConfigParser(behaviour).read(config);
		assert.equal(behaviour.maxLifeTime, config.time);
		assert.equal(behaviour.timeVariance, config.variance);
	});

});
