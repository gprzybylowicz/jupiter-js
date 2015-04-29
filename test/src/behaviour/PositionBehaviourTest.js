var PositionBehaviour = require("jupiter").PositionBehaviour;
var Particle = require("jupiter").Particle;
var PositionConfigParser = require("jupiter").config.PositionConfigParser;

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

		assert.equal(particle.position.x, 3);
		assert.equal(particle.position.y, 5);

		assert.equal(particle.velocity.x, 4);
		assert.equal(particle.velocity.y, 9);

		assert.equal(particle.acceleration.x, 6);
		assert.equal(particle.acceleration.y, 13);
	});

	it("apply", function() {
		var particle = new Particle();
		behaviour.init(particle);

		var startX = particle.position.x;
		var startY = particle.position.y;
		var velocityX = particle.velocity.x + (particle.acceleration.x * DELTA_TIME);
		var velocityY = particle.velocity.y + (particle.acceleration.y * DELTA_TIME);

		behaviour.apply(particle, DELTA_TIME);

		assert.equal(particle.velocity.x, velocityX);
		assert.equal(particle.velocity.y, velocityY);

		assert.equal(particle.position.x, startX + velocityX * DELTA_TIME);
		assert.equal(particle.position.y, startY + velocityY * DELTA_TIME);
	});

	it("getConfigParser return position config parser", function() {
		var behaviour = new PositionBehaviour();
		assert.instanceOf(behaviour.getConfigParser(), PositionConfigParser);
	});

});
