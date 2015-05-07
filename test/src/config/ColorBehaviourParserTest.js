var ColorBehaviour = require("jupiter").ColorBehaviour;
var ColorConfigParser = require("jupiter").config.ColorConfigParser;

describe("ColorBehaviourParserTest", function() {
	it("write", function() {
		var behaviour = new ColorBehaviour();
		behaviour.colorStart.hex = 0x7722AA;
		behaviour.colorEnd.alpha = 0.7;
		behaviour.colorStartVariance.hex = 0x111111;
		behaviour.colorStartVariance.alpha = 1;
		behaviour.colorEndVariance.alpha = 0.5;

		var target = {
			start: {hex: 0x7722AA, alpha: 0},
			end: {hex: 0x0000, alpha: 0.7},
			startVariance: {hex: 0x111111, alpha: 1},
			endVariance: {hex: 0x0000, alpha: 0.5}
		};
		var config = {};
		new ColorConfigParser(behaviour).write(config);
		assert.deepEqual(config, target);
	});

	it("read", function() {
		var behaviour = new ColorBehaviour();

		var config = {
			start: {hex: 0x02221, alpha: 0},
			startVariance: {hex: 0x111111, alpha: 1},
			endVariance: {hex: 0x0000, alpha: 0.5}
		};
		new ColorConfigParser(behaviour).read(config);
		assert.equal(behaviour.colorStart.hex, 0x02221);
		assert.equal(behaviour.colorStart.alpha, 0);
		assert.equal(behaviour.colorEnd.hex, 0x000000);
		assert.equal(behaviour.colorEnd.alpha, 0);
		assert.equal(behaviour.colorStartVariance.hex, 0x111111);
		assert.equal(behaviour.colorEndVariance.alpha, 0.5);
	});
});
