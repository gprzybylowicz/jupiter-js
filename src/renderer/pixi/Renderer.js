function Renderer(emitter, texture) {
	PIXI.Container.call(this);

	this.emitter = emitter;
	this.sprites = {};
	this.unusedSprites = [];
	this.texture = texture;

	this.currentTime = 0;
	this.lastTime = 0;

	emitter.on("emitter/create", this.onCreate, this);
	emitter.on("emitter/update", this.onUpdate, this);
	emitter.on("emitter/remove", this.onRemove, this);
	emitter.on("emitter/play", this.onPlay, this);
}

Renderer.prototype = Object.create(PIXI.Container.prototype);
Renderer.prototype.constructor = Renderer;

Renderer.prototype.updateTransform = function() {
	this.currentTime = performance.now();

	if (this.lastTime === 0) {
		this.lastTime = this.currentTime;
	}

	this.emitter.update((this.currentTime - this.lastTime) / 1000);
	PIXI.Container.prototype.updateTransform.call(this);

	this.lastTime = this.currentTime;
};

Renderer.prototype.onPlay = function() {
	this.currentTime = 0;
	this.lastTime = 0;
};

Renderer.prototype.onCreate = function(particle) {
	var sprite = this.getOrCreateSprite();
	sprite.visible = true;
	if (this.blendMode) {
		sprite.blendMode = this.blendMode;
	}
	particle.sprite = sprite;
};

Renderer.prototype.getOrCreateSprite = function() {
	if (this.unusedSprites.length > 0) {
		return this.unusedSprites.pop();
	}

	var sprite = new PIXI.Sprite(this.texture);
	sprite.anchor.set(0.5, 0.5);
	return this.addChild(sprite);
};

Renderer.prototype.onUpdate = function(particle) {
	var sprite = particle.sprite;

	sprite.x = particle.x;
	sprite.y = particle.y;

	sprite.scale.x = particle.size.x;
	sprite.scale.y = particle.size.y;

	sprite.tint = particle.color.hex;
	sprite.alpha = particle.color.alpha;
	sprite.rotation = particle.rotation;
};

Renderer.prototype.onRemove = function(particle) {
	var sprite = particle.sprite;
	particle.sprite = null;
	sprite.visible = false;
	this.unusedSprites.push(sprite);
};

Object.defineProperty(Renderer.prototype, "texture", {
	get: function() {
		return this._texture;
	},
	set: function(value) {
		this._texture = value;
		this.updateTexture();
	}
});

Renderer.prototype.updateTexture = function() {
	for (var i = 0; i < this.unusedSprites.length; ++i) {
		this.unusedSprites[i].texture = this.texture;
	}

	for (i = 0; i < this.children.length; ++i) {
		this.children[i].texture = this.texture;
	}
};

Renderer.prototype.playEmitter = function() {
	this.emitter.play();
};

Renderer.prototype.stopEmitter = function() {
	this.emitter.stop();
};

Renderer.prototype.resetEmitter = function() {
	this.emitter.reset();
};

Renderer.prototype.getEmitterBehaviourByName = function(name) {
	return this.emitter.behaviours.getByName(name);

};

module.exports = Renderer;