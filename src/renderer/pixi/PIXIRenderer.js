function PIXIRenderer(emitter, texture) {
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
	emitter.on("emitter/complete", this.onEmitComplete, this);
	this.play();
}

PIXIRenderer.prototype = Object.create(PIXI.Container.prototype);
PIXIRenderer.prototype.constructor = PIXIRenderer;

PIXIRenderer.prototype.play = function() {
	this.emitter.resetAndPlay();
};

PIXIRenderer.prototype.stop = function() {
	this.emitter.stop();
};

PIXIRenderer.prototype.reset = function() {
	this.emitter.reset();
};

PIXIRenderer.prototype.updateTransform = function() {
	this.currentTime = performance.now();

	this.emitter.update((this.currentTime - this.lastTime) / 1000);
	PIXI.Container.prototype.updateTransform.call(this);

	this.lastTime = this.currentTime;
};

PIXIRenderer.prototype.onCreate = function(particle) {
	var sprite = this.getOrCreateSprite();
	sprite.visible = true;
	particle.sprite = sprite;
};

PIXIRenderer.prototype.getOrCreateSprite = function() {
	if (this.unusedSprites.length > 0) {
		return this.unusedSprites.pop();
	}

	var sprite = new PIXI.Sprite(this.texture);
	sprite.anchor.set(0.5, 0.5);
	return this.addChild(sprite);
};

PIXIRenderer.prototype.onUpdate = function(particle) {
	var sprite = particle.sprite;

	sprite.x = particle.position.x;
	sprite.y = particle.position.y;

	sprite.scale.x = particle.size.x;
	sprite.scale.y = particle.size.y;

	sprite.tint = particle.color.hex;
	sprite.alpha = particle.color.alpha;
};

PIXIRenderer.prototype.onRemove = function(particle) {
	var sprite = particle.sprite;
	particle.sprite = null;
	sprite.visible = false;
	this.unusedSprites.push(sprite);
};

PIXIRenderer.prototype.onEmitComplete = function() {
	this.stop();
};

Object.defineProperty(PIXIRenderer.prototype, "texture", {
	get: function() {
		return this._texture;
	},
	set: function(value) {
		this._texture = value;
		this.updateTexture();
	}
});

PIXIRenderer.prototype.updateTexture = function() {
	for (var i = 0; i < this.unusedSprites.length; ++i) {
		this.unusedSprites[i].texture = this.texture;
	}

	for (i = 0; i < this.children.length; ++i) {
		this.children[i].texture = this.texture;
	}
};

module.exports = PIXIRenderer;