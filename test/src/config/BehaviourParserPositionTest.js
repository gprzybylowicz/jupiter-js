var PositionBehaviour = require("jupiter").PositionBehaviour;
var Point = require("jupiter").Point;

describe("BehaviourParserPositionTest", function() {

	var TARGET_CONFIG = {
		name: "PositionBehaviour",
		priority: PositionBehaviour.DEFAULT_PRIORITY,
		position: {x: 2, y: 3},
		positionVariance: {x: 3, y: 4},
		velocity: {x: 10, y: 11},
		velocityVariance: {x: 20, y: 21},
		acceleration: {x: 30, y: 31},
		accelerationVariance: {x: 40, y: 41}

	};

	it("write", function() {
		var behaviour = new PositionBehaviour();
		behaviour.position.set(2, 3);
		behaviour.positionVariance.set(3, 4);
		behaviour.velocity.set(10, 11);
		behaviour.velocityVariance.set(20, 21);
		behaviour.acceleration.set(30, 31);
		behaviour.accelerationVariance.set(40, 41);

		var config = behaviour.getParser().write();
		assert.deepEqual(config, TARGET_CONFIG);
	});

	it("read", function() {
		var behaviour = new PositionBehaviour();
		behaviour.getParser().read(TARGET_CONFIG);

		assert.deepEqual(behaviour.position, new Point(2, 3));
		assert.deepEqual(behaviour.positionVariance, new Point(3, 4));
		assert.deepEqual(behaviour.velocity, new Point(10, 11));
		assert.deepEqual(behaviour.velocityVariance, new Point(20, 21));
		assert.deepEqual(behaviour.acceleration, new Point(30, 31));
		assert.deepEqual(behaviour.accelerationVariance, new Point(40, 41));
	});
});
