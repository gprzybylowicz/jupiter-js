var ColorBehaviour = require("jupiter").ColorBehaviour;
var Color = require("jupiter").Color;

describe("BehaviourParserColorTest", function() {

	var TARGET_CONFIG = {
		type: "ColorBehaviour",
		priority: 0,
		start: {_r: 100, _g: 200, _b: 0, _alpha: 0},
		end: {_r: 1, _g: 2, _b: 3, _alpha: 0.7},
		startVariance: {_r: 10, _g: 20, _b: 30, _alpha: 1},
		endVariance: {_r: 0, _g: 0, _b: 0, _alpha: 0.5}
	};

	it("write to config", function() {
		var behaviour = new ColorBehaviour();
		behaviour.start.set(100, 200, 0);
		behaviour.end.set(1, 2, 3, 0.7);
		behaviour.startVariance.set(10, 20, 30, 1);
		behaviour.endVariance.set(0, 0, 0, 0.5);

		var config = behaviour.getConfigParser().write();
		assert.deepEqual(config, TARGET_CONFIG);
	});

	it("read from config", function() {
		var behaviour = new ColorBehaviour();
		behaviour.getConfigParser().read(TARGET_CONFIG);

		assert.deepEqual(behaviour.start, new Color(100, 200, 0, 0));
		assert.deepEqual(behaviour.end, new Color(1, 2, 3, 0.7));
		assert.deepEqual(behaviour.startVariance, new Color(10, 20, 30, 1));
		assert.deepEqual(behaviour.endVariance, new Color(0, 0, 0, 0.5));
	});
});

