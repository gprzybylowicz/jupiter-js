var EmitDirectionBehaviour = require("jupiter").EmitDirectionBehaviour;
var MathUtil = require("jupiter").Math;
var Particle = require("jupiter").Particle;
var BehaviourParser = require("jupiter").BehaviourParser;

describe("EmitDirectionBehaviourTest", function() {

	var behaviour = new EmitDirectionBehaviour();

	beforeEach(function() {
		behaviour.angle = 0;
		behaviour.variance = 0;
	});

	it("angleInDegrees", function() {
		var stub = sinon.stub(MathUtil, "degreesToRadians").returns(10);
		behaviour.angleInDegrees = 45;

		assert.ok(stub.called, "called mathod from math");
		assert.equal(behaviour.angle, 10, "called method from math");

		stub.restore();
	});

	it("varianceInDegrees", function() {
		var stub = sinon.stub(MathUtil, "degreesToRadians").returns(10);
		behaviour.varianceInDegrees = 45;

		assert.ok(stub.called, "called mathod from math");
		assert.equal(behaviour.variance, 10, "called method from math");

		stub.restore();
	});

	it("init - check sin, cos", function() {
		var particle = new Particle();
		var angle = 0.5;
		behaviour.angle = angle;

		behaviour.init(particle);
		assert.closeTo(particle.directionCos, Math.cos(angle), MathUtil.EPSILON, "has correnct direction cosinus");
		assert.closeTo(particle.directionSin, Math.sin(angle), MathUtil.EPSILON, "has correnct direction sinus");
	});

	it("aplay", function() {
		var particle = new Particle();
		var COS = Math.cos(0.785398163);
		var SIN = Math.sin(0.785398163);
		var X = 10;
		var Y = 20;
		particle.x = X;
		particle.y = Y;
		particle.directionCos = COS;
		particle.directionSin = SIN;

		//x1 = x * cosA - y * sinA
		//x2 = x * sinA + y * cosA

		var targetX = X * COS - Y * SIN;
		var targetY = X * SIN + Y * COS;

		behaviour.apply(particle);

		assert.closeTo(particle.x, targetX, MathUtil.EPSILON, "x position");
		assert.closeTo(particle.y, targetY, MathUtil.EPSILON, "y postition");
	});

});
