//var PositionBehaviour = require("jupiter").PositionBehaviour;
//var PositionConfigParser = require("jupiter").config.PositionConfigParser;
//var Point = require("jupiter").Point;
//
//describe("BehaviourParserTest", function() {
//	it("write", function() {
//		var behaviour = new PositionBehaviour();
//		behaviour.position.set(2, 3);
//		behaviour.positionVariance.set(3, 4);
//		behaviour.velocity.set(10, 11);
//		behaviour.velocityVariance.set(20, 21);
//		behaviour.acceleration.set(30, 31);
//		behaviour.accelerationVariance.set(40, 41);
//
//		var target = {
//			position: {x: 2, y: 3},
//			positionVariance: {x: 3, y: 4},
//			velocity: {x: 10, y: 11},
//			velocityVariance: {x: 20, y: 21},
//			acceleration: {x: 30, y: 31},
//			accelerationVariance: {x: 40, y: 41}
//		};
//		var config = {};
//		new PositionConfigParser(behaviour).write(config);
//		assert.deepEqual(config, target);
//	});
//
//	it("read", function() {
//		var behaviour = new PositionBehaviour();
//
//		var config = {
//			position: {x: 2, y: 3},
//			positionVariance: {x: 3, y: 4},
//			velocity: {x: 10, y: 11},
//			velocityVariance: {x: 20, y: 21},
//			acceleration: {x: 30, y: 31},
//			accelerationVariance: {x: 40, y: 41}
//		};
//		new PositionConfigParser(behaviour).read(config);
//		assert.deepEqual(behaviour.position, new Point(2, 3));
//		assert.deepEqual(behaviour.positionVariance, new Point(3, 4));
//		assert.deepEqual(behaviour.velocity, new Point(10, 11));
//		assert.deepEqual(behaviour.velocityVariance, new Point(20, 21));
//		assert.deepEqual(behaviour.acceleration, new Point(30, 31));
//		assert.deepEqual(behaviour.accelerationVariance, new Point(40, 41));
//	});
//});
