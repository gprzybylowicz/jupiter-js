var SizeBehaviour = require("jupiter").SizeBehaviour;
var Point = require("jupiter").Point;

describe("SizeBehaviourParserTest", function() {

	var TARGET_CONFIG = {
		SizeBehaviour: {
			priority: SizeBehaviour.DEFAULT_PRIORITY,
			allowNegativeValues: true,
			sizeStart: {x: 10, y: 20},
			sizeEnd: {x: 100, y: 200},
			startVariance: 55,
			endVariance: 66
		}
	};

	it("write", function() {
		var behaviour = new SizeBehaviour();
		behaviour.allowNegativeValues = true;
		behaviour.sizeStart.set(10, 20);
		behaviour.sizeEnd.set(100, 200);
		behaviour.startVariance = 55;
		behaviour.endVariance = 66;

		var config = {};
		behaviour.getConfigParser().write(config);
		assert.deepEqual(config, TARGET_CONFIG);
	});

	it("read", function() {
		var behaviour = new SizeBehaviour();
		behaviour.getConfigParser().read(TARGET_CONFIG.SizeBehaviour);

		assert.ok(behaviour.allowNegativeValues);
		assert.deepEqual(behaviour.sizeStart, new Point(10, 20));
		assert.deepEqual(behaviour.sizeEnd, new Point(100, 200));
		assert.equal(behaviour.startVariance, 55);
		assert.equal(behaviour.endVariance, 66);
	});
});
