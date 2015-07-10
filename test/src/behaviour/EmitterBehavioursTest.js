var EmitterBehaviours = require("jupiter").EmitterBehaviours;
var Behaviour = require("jupiter").Behaviour;
var Particle = require("jupiter").Particle;

describe("EmitterBehavioursTest", function() {

	var behaviours;

	beforeEach(function() {
		behaviours = new EmitterBehaviours();
	});

	it("add", function() {
		assert.equal(behaviours.getAll().length, 0);

		behaviours.add(new Behaviour());
		assert.equal(behaviours.getAll().length, 1);

		behaviours.add(new Behaviour());
		assert.equal(behaviours.getAll().length, 2);
	});

	it("add - return added behaviour", function() {
		var behaviour = new Behaviour();
		assert.ok(behaviour === behaviours.add(behaviour));
	});

	it("init ", function() {
		var behaviour = new Behaviour();
		var fakeParticle = new Particle();
		var spy = sinon.spy(behaviour, "init");

		behaviours.add(behaviour);
		behaviours.init(fakeParticle);

		assert.ok(spy.calledOnce);
		assert.ok(spy.calledWithExactly(fakeParticle));
		spy.restore();
	});

	it("apply ", function() {
		var behaviour = new Behaviour();
		var fakeParticle = new Particle();
		var spy = sinon.spy(behaviour, "apply");

		behaviours.add(behaviour);
		behaviours.apply(fakeParticle, 0.2);

		assert.ok(spy.calledOnce);
		assert.ok(spy.calledWithExactly(fakeParticle, 0.2));

		spy.restore();
	});

	it("init - priority ", function() {
		var low = new Behaviour();
		var normal = new Behaviour();
		var high = new Behaviour();

		low.priority = -10;
		high.priority = 20;

		var spyLow = sinon.spy(low, "init");
		var spyNormal = sinon.spy(normal, "init");
		var spyHigh = sinon.spy(high, "init");

		behaviours.add(high);
		behaviours.add(low);
		behaviours.add(normal);

		behaviours.init(new Particle());
		assert.ok(spyHigh.calledBefore(spyNormal));
		assert.ok(spyNormal.calledBefore(spyLow));

		behaviours.init(new Particle());
		assert.ok(spyHigh.calledBefore(spyNormal));
		assert.ok(spyNormal.calledBefore(spyLow));

		spyLow.restore();
		spyNormal.restore();
		spyHigh.restore();
	});

	it("apply - priority ", function() {
		var low = new Behaviour();
		var normal = new Behaviour();
		var high = new Behaviour();

		low.priority = -10;
		high.priority = 20;

		var spyLow = sinon.spy(low, "apply");
		var spyNormal = sinon.spy(normal, "apply");
		var spyHigh = sinon.spy(high, "apply");

		behaviours.add(high);
		behaviours.add(low);
		behaviours.add(normal);

		behaviours.apply(new Particle(), 0);
		assert.ok(spyHigh.calledBefore(spyNormal));
		assert.ok(spyNormal.calledBefore(spyLow));

		spyLow.restore();
		spyNormal.restore();
		spyHigh.restore();
	});

	it("isEmpty", function(){
		assert.ok(behaviours.isEmpty());

		behaviours.add(new Behaviour());
		assert.notOk(behaviours.isEmpty());
	});

});
