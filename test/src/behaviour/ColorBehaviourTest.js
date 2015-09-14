var ColorBehaviour = require("jupiter").ColorBehaviour;
var BehaviourParser = require("jupiter").BehaviourParser;
var Particle = require("jupiter").Particle;
var Math = require("jupiter").Math;

describe("ColorBehaviourTest", function() {

	it("getParser return color config parser", function() {
		var behaviour = new ColorBehaviour();
		assert.instanceOf(behaviour.getParser(), BehaviourParser);
	});

	it("init - start and end color should have default values", function() {
		var particle = new Particle();
		var behaviour = new ColorBehaviour();
		behaviour.init(particle);
		assert.equal(particle.colorStart.hex, 0x000000, "start color shod equal 0");
		assert.equal(particle.colorStart.alpha, 1, "start color alpha should equal 1");

		assert.equal(particle.colorEnd.hex, 0x000000, "end color should equal 0");
		assert.equal(particle.colorEnd.alpha, 1, "start color alpha should equal 1");
	});

	it("update - should update current alpha channel based on life progress form 1 to 0", function() {
		var particle = new Particle();
		var behaviour = new ColorBehaviour();
		behaviour.end.alpha = 0;

		behaviour.init(particle);
		assert.equal(particle.color.alpha, 1, "alpha should equal 1 as start");

		particle.lifeProgress = 0.3;
		behaviour.apply(particle, 0);
		assert.closeTo(particle.color.alpha, 0.7, Math.EPSILON, "should be close to 0.7 after 30% of life time");

		particle.lifeProgress = 0.8;
		behaviour.apply(particle, 0);
		assert.closeTo(particle.color.alpha, 0.2, Math.EPSILON, "should be close to 0.2 after 80% of life time");

		particle.lifeProgress = 1;
		behaviour.apply(particle, 0);
		assert.closeTo(particle.color.alpha, 0.0, Math.EPSILON, "should be close to 0 after 100% of life time");
	});

	it("update - should update current alpha channel based on life progress form 0 to 1", function() {
		var particle = new Particle();
		var behaviour = new ColorBehaviour();
		behaviour.start.alpha = 0;
		behaviour.end.alpha = 1;

		behaviour.init(particle);
		assert.equal(particle.color.alpha, 0, "alpha should equal 0 at start");

		particle.lifeProgress = 0.3;
		behaviour.apply(particle, 0);
		assert.closeTo(particle.color.alpha, 0.3, Math.EPSILON, "should be close to 0.3 after 30% of life time");

		particle.lifeProgress = 0.8;
		behaviour.apply(particle, 0);
		assert.closeTo(particle.color.alpha, 0.8, Math.EPSILON, "should be close to 0.8 after 80% of life time");

		particle.lifeProgress = 1;
		behaviour.apply(particle, 0);
		assert.closeTo(particle.color.alpha, 1.0, Math.EPSILON, "should be close to 1 after 100% of life time");
	});
});
