var EmitterBehaviours = require("./behaviour").EmitterBehaviours;
var LifeBehaviour = require("./behaviour").LifeBehaviour;
var ParticlePool = require("./ParticlePool.js");

function Emitter(observer) {

	this.emitPerFrame = 1;
	this.maxParticles = 0;
	this.list = new List();
	this.behavious = new EmitterBehaviours();

	this.lifeBehaviour = new LifeBehaviour(); //TODO: removed this dependency
	this.behavious.add(this.lifeBehaviour);

	this.play = true;
	this.frames = 0;

	this.setObserver(observer);
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
	if(!this.play) return;

	this.createParticles(deltaTime);

	this.list.forEach(function(particle) {
		this.updateParticle(particle, deltaTime);
	}.bind(this));
};

Emitter.prototype.createParticles = function(deltaTime) {
	var emitPerSec = this.maxParticles/this.lifeBehaviour.maxLifeTime;
	var fps =  1/deltaTime;
	var ratio = (emitPerSec/fps);
	this.frames += ratio;



	if(this.frames >= 1.0){
		var toEmit = Math.round(this.frames);
		this.frames = 0;
		for (var i = 0; i < toEmit; ++i) {
			var particle = this.list.add(ParticlePool.global.pop());
			this.behavious.init(particle);
			this.observer.onCreate(particle);
		}
	}

};

Emitter.prototype.updateParticle = function(particle, deltaTime) {
	if (particle.isDead()) {
		this.observer.onRemove(particle);
		this.list.remove(particle);
		ParticlePool.global.push(particle);
	}
	else {
		this.behavious.apply(particle, deltaTime);
		this.observer.onUpdate(particle);
	}
};

module.exports = Emitter;
