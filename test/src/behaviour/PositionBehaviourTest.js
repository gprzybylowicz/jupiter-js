var PositionBehaviour = require("jupiter").PositionBehaviour;
var Particle = require("jupiter").Particle;
var BehaviourParser = require("jupiter").BehaviourParser;

describe("PositionBehaviourTest", function() {

	var DELTA_TIME = 0.5;
	var behaviour = new PositionBehaviour();
	var sub;

	before(function() {
		sub = sinon.stub(behaviour, "varianceFrom", function(value) {
			return value;
		});

	});

	beforeEach(function() {
		behaviour.position.set(1, 2);
		behaviour.positionVariance.set(2, 3);

		behaviour.velocity.set(2, 4);
		behaviour.velocityVariance.set(2, 5);

		behaviour.acceleration.set(3, 6);
		behaviour.accelerationVariance.set(3, 7);
	});

	after(function() {
		sub.restore();
	});

	it("init", function() {
		var particle = new Particle();
		behaviour.init(particle);

		assert.equal(particle.x, 3);
		assert.equal(particle.y, 5);

		assert.equal(particle.velocity.x, 4);
		assert.equal(particle.velocity.y, 9);

		assert.equal(particle.acceleration.x, 6);
		assert.equal(particle.acceleration.y, 13);
	});

	it("apply", function() {
		var particle = new Particle();
		behaviour.init(particle);

		var startX = particle.x;
		var startY = particle.y;
		var velocityX = particle.velocity.x + (particle.acceleration.x * DELTA_TIME);
		var velocityY = particle.velocity.y + (particle.acceleration.y * DELTA_TIME);

		behaviour.apply(particle, DELTA_TIME);

		assert.equal(particle.velocity.x, velocityX);
		assert.equal(particle.velocity.y, velocityY);

		assert.equal(particle.x, startX + velocityX * DELTA_TIME);
		assert.equal(particle.y, startY + velocityY * DELTA_TIME);
	});

	it("getParser return position config parser", function() {
		var behaviour = new PositionBehaviour();
		assert.instanceOf(behaviour.getParser(), BehaviourParser);
	});

});
