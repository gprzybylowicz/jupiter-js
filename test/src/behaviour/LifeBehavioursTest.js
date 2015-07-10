var LifeBehaviour = require("jupiter").LifeBehaviour;
var Particle = require("jupiter").Particle;
var MathUtil = require("jupiter").Math;
var BehaviourParser = require("jupiter").BehaviourParser;

describe("LifeBehaviourTest", function() {

	var DELTA_TIME = 1.0 / 60.0;
	var behaviour = new LifeBehaviour();
	var sub;

	before(function() {
		sub = sinon.stub(behaviour, "varianceFrom", function(value) {
			return value;
		});

	});

	beforeEach(function() {
		behaviour.maxLifeTime = 10;
		behaviour.timeVariance = 10;
	});

	after(function() {
		sub.restore();
	});

	it("init", function() {
		var particle = new Particle();
		behaviour.init(particle);

		assert.equal(particle.lifeTime, 0);
		assert.equal(particle.lifeProgress, 0);
		assert.equal(particle.maxLifeTime, 20);
	});

	it("init - maxLifeTime always is greater or equal 0", function() {
		var particle = new Particle();

		behaviour.timeVariance = -1000;
		behaviour.init(particle);

		assert.equal(particle.lifeTime, 0);
		assert.equal(particle.lifeProgress, 0);
		assert.equal(particle.maxLifeTime, 0);
	});

	it("apply", function() {
		var particle = new Particle();
		behaviour.init(particle);

		for (var i = 0; i < 10; i++) {
			behaviour.apply(particle, DELTA_TIME);
			var correctLifeTime = DELTA_TIME * (i + 1);
			assert.closeTo(particle.lifeTime, correctLifeTime, MathUtil.EPSILON);
			assert.closeTo(particle.lifeProgress, correctLifeTime / 20, MathUtil.EPSILON);
		}

	});

	it("getParser return life config parser", function() {
		var behaviour = new LifeBehaviour();
		assert.instanceOf(behaviour.getParser(), BehaviourParser);
	});
});
