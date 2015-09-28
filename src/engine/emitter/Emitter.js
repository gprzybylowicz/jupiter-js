module.exports = Emitter;

var EmitterBehaviours = require("../behaviour").EmitterBehaviours;
var ParticlePool = require("../ParticlePool.js");
var util = require("../util");
var DefaultEmitController = require("../controller").DefaultEmitController;
var EmitterParser = require("../parser").EmitterParser;
var parser = require("../parser");
var EventEmitter = require("eventemitter3");

function Emitter() {
	EventEmitter.call(this);

	this.list = new util.List();
	this.behaviours = new EmitterBehaviours();
	this.emitController = new DefaultEmitController();

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

	if (this.emitController.isEnd() && this.list.isEmpty()) {
		this.stop();
		this.emit(Emitter.COMPLETE);
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
	this.list.forEach(function(particle) {
		this.removeParticle(particle);
	}.bind(this));
	this.emit(Emitter.RESET);
};

Emitter.prototype.stop = function() {
	this._play = false;
	this.emit(Emitter.STOP);
};

