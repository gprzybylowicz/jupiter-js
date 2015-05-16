var EmitterBehaviours = require("../behaviour").EmitterBehaviours;
var LifeBehaviour = require("../behaviour").LifeBehaviour;
var ParticlePool = require("../ParticlePool.js");
var List = require("../util").List;
var DefaultEmitController = require("../controller").DefaultEmitController;

function Emitter(observer) {
	this.list = new List();
	this.behaviours = new EmitterBehaviours();

	this.play = true;
	this.setObserver(observer);
	this.emitController = new DefaultEmitController();
}

Emitter.prototype.setObserver = function(observer) {
	var nullFunction = function() {
	};

	this.observer = observer || {};
	this.observer.onCreate = this.observer.onCreate || nullFunction;
	this.observer.onUpdate = this.observer.onUpdate || nullFunction;
	this.observer.onRemove = this.observer.onRemove || nullFunction;

};

Emitter.prototype.update = function(deltaTime) {
	if (!this.play) return;

	this.createParticles(deltaTime);

	this.list.forEach(function(particle) {
		this.updateParticle(particle, deltaTime);
	}.bind(this));
};

Emitter.prototype.createParticles = function(deltaTime) {
	var particlesToEmit = this.emitController.howMany(deltaTime);

	for (var i = 0; i < particlesToEmit; ++i) {
		var particle = this.list.add(ParticlePool.global.pop());
		this.behaviours.init(particle);
		this.observer.onCreate(particle);
	}
};

Emitter.prototype.updateParticle = function(particle, deltaTime) {
	if (particle.isDead()) {
		this.observer.onRemove(particle);
		this.list.remove(particle);
		ParticlePool.global.push(particle);
	}
	else {
		this.behaviours.apply(particle, deltaTime);
		this.observer.onUpdate(particle);
	}
};


module.exports = Emitter;
