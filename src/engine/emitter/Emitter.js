module.exports = Emitter;

var EmitterBehaviours = require("../behaviour").EmitterBehaviours;
var ParticlePool = require("../ParticlePool.js");
var util = require("../util");
var emission = require("../emission");
var EmitterParser = require("../parser").EmitterParser;
var EventEmitter = require("eventemitter3");
var Duration = require("./Duration.js");

function Emitter() {
	EventEmitter.call(this);

	this.list = new util.List();
	this.behaviours = new EmitterBehaviours();
	this.emitController = new emission[emission.EmissionTypes.DEFAULT];
	this.duration = new Duration();

	this.play();
}

util.inherit(Emitter, EventEmitter);

Emitter.PLAY = "emitter/play";
Emitter.STOP = "emitter/stop";
Emitter.RESET = "emitter/reset";
Emitter.CREATE = "emitter/create";
Emitter.UPDATE = "emitter/update";
Emitter.REMOVE = "emitter/remove";
Emitter.COMPLETE = "emitter/complete";

Emitter.prototype.update = function(deltaTime) {
	if (!this._play) return;

	this.emitParticles(deltaTime);
	this.updateParticles(deltaTime);
	this.duration.update(deltaTime);

	if (this.duration.isTimeElapsed() && this.list.isEmpty()) {
		this.stop();
		this.emit(Emitter.COMPLETE);
	}
};

Emitter.prototype.emitParticles = function(deltaTime) {
	if (!this.duration.isTimeElapsed()) {
		this.createParticles(deltaTime);
	}
};

Emitter.prototype.createParticles = function(deltaTime) {
	var particlesToEmit = this.emitController.howMany(deltaTime, this.list.length);
	for (var i = 0; i < particlesToEmit; ++i) {
		var particle = this.list.add(ParticlePool.global.pop());
		this.behaviours.init(particle);
		this.emit(Emitter.CREATE, particle);
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
		this.emit(Emitter.UPDATE, particle);
	}
};

Emitter.prototype.removeParticle = function(particle) {
	this.emit(Emitter.REMOVE, particle);
	this.list.remove(particle);
	particle.reset();
	ParticlePool.global.push(particle);
};

Emitter.prototype.getParser = function() {
	return new EmitterParser(this);
};

Emitter.prototype.play = function() {
	this._play = true;
	this.emit(Emitter.PLAY);
};

Emitter.prototype.resetAndPlay = function() {
	this.reset();
	this.play();
};

Emitter.prototype.reset = function() {
	this.emitController.reset();
	this.duration.reset();
	this.removeParticles();
	this.emit(Emitter.RESET);
};

Emitter.prototype.stop = function() {
	this._play = false;
	this.removeParticles();
	this.emit(Emitter.STOP);
};

Emitter.prototype.removeParticles = function() {
	this.list.forEach(function(particle) {
		this.removeParticle(particle);
	}.bind(this));
};
