module.exports = Emitter;

var EmitterBehaviours = require("../behaviour").EmitterBehaviours;
var NullObserver = require("./NullObserver.js");
var ParticlePool = require("../ParticlePool.js");
var List = require("../util").List;
var DefaultEmitController = require("../controller").DefaultEmitController;
var EmitterParser = require("../parser").EmitterParser;
var parser = require("../parser");

function Emitter(observer) {
	this.list = new List();
	this.behaviours = new EmitterBehaviours();

	this.setObserver(observer);
	this.emitController = new DefaultEmitController();
	this.play();
}

Emitter.prototype.setObserver = function(observer) {
	this.observer = observer || new NullObserver();
};

Emitter.prototype.update = function(deltaTime) {
	if (!this._play) return;

	this.emitParticles(deltaTime);
	this.updateParticles(deltaTime);

	if (this.emitController.isEnd() && this.list.isEmpty()) {
		this.stop();
		this.observer.onEmitComplete();
	}
};

Emitter.prototype.emitParticles = function(deltaTime) {
	if (!this.emitController.isEnd()) {
		this.createParticles(deltaTime);
	}

};

Emitter.prototype.createParticles = function(deltaTime) {
	var particlesToEmit = this.emitController.howMany(deltaTime);

	for (var i = 0; i < particlesToEmit; ++i) {
		var particle = this.list.add(ParticlePool.global.pop());
		this.behaviours.init(particle);
		this.observer.onCreate(particle);
	}
};

Emitter.prototype.updateParticles = function(deltaTime) {
	this.list.forEach(function(particle) {
		this.updateParticle(particle, deltaTime);
	}.bind(this));

};

Emitter.prototype.updateParticle = function(particle, deltaTime) {
	if (particle.isDead()) {
		this.removeParticle(particle);
	}
	else {
		this.behaviours.apply(particle, deltaTime);
		this.observer.onUpdate(particle);
	}
};

Emitter.prototype.removeParticle = function(particle) {
	this.observer.onRemove(particle);
	this.list.remove(particle);
	ParticlePool.global.push(particle);
};

Emitter.prototype.getParser = function() {
	return new EmitterParser(this);
};

Emitter.prototype.play = function() {
	this._play = true;
};

Emitter.prototype.resetAndPlay = function() {
	this.reset();
	this.play();
};

Emitter.prototype.reset = function() {
	this.emitController.reset();
	this.list.forEach(function(particle) {
		this.removeParticle(particle);
	}.bind(this));
};

Emitter.prototype.stop = function() {
	this._play = false;
};

