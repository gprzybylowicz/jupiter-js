var SizeBehaviour = require("jupiter").SizeBehaviour;
var Particle = require("jupiter").Particle;
var BehaviourParser = require("jupiter").BehaviourParser;

describe("SizeBehaviourTest", function() {

	var DELTA_TIME = 1.0 / 60.0;
	var behaviour = new SizeBehaviour();
	var sub;

	before(function() {
		sub = sinon.stub(behaviour, "varianceFrom", function(value) {
			return value;
		});

	});

	beforeEach(function() {
		behaviour.sizeStart.set(5, 5);
		behaviour.sizeEnd.set(10, 10);
		behaviour.startVariance = 1;
		behaviour.endVariance = 2;
	});

	after(function() {
		sub.restore();
	});

	it("init", function() {
		var particle = new Particle();
		behaviour.init(particle);

		assert.equal(particle.size.x, 6);
		assert.equal(particle.size.y, 6);
		assert.equal(particle.sizeStart.x, 6);
		assert.equal(particle.sizeStart.y, 6);
		assert.equal(particle.sizeEnd.y, 12);
		assert.equal(particle.sizeEnd.y, 12);
	});

	it("init - without negative values", function() {
		var particle = new Particle();
		behaviour.startVariance = -100;
		behaviour.endVariance = -100;
		behaviour.init(particle);

		assert.equal(particle.size.x, 0);
		assert.equal(particle.size.y, 0);
		assert.equal(particle.sizeStart.x, 0);
		assert.equal(particle.sizeStart.y, 0);
		assert.equal(particle.sizeEnd.y, 0);
		assert.equal(particle.sizeEnd.y, 0);
	});

	it("init - with negative values", function() {
		var particle = new Particle();
		behaviour.allowNegativeValues = true;
		behaviour.startVariance = -100;
		behaviour.endVariance = -100;
		behaviour.init(particle);

		assert.equal(particle.size.x, -95);
		assert.equal(particle.size.y, -95);
		assert.equal(particle.sizeStart.x, -95);
		assert.equal(particle.sizeStart.y, -95);
		assert.equal(particle.sizeEnd.y, -90);
		assert.equal(particle.sizeEnd.y, -90);
	});

	var checkAfterApply = function(lifeProgress, correctValue) {
		var particle = new Particle();
		particle.lifeProgress = lifeProgress;
		behaviour.init(particle);
		behaviour.apply(particle, DELTA_TIME);

		assert.equal(particle.size.x, correctValue);
		assert.equal(particle.size.y, correctValue);
	};

	it("apply - with lifeProgress equals 0", function() {
		checkAfterApply(0, 6);
	});

	it("apply - with lifeProgress equals 0.5", function() {
		checkAfterApply(0.5, 9);
	});

	it("apply - with lifeProgress equals 1", function() {
		checkAfterApply(1, 12);
	});

	it("getConfigParser return size config parser", function() {
		var behaviour = new SizeBehaviour();
		assert.instanceOf(behaviour.getConfigParser(), BehaviourParser);
	});

});
