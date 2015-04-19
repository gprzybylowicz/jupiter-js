var Point = require("util/Point");
var Color = require("util/Color");

Particle._UID = Particle._UID || {value: 0};

function Particle() {
	this.next = null;
	this.prev = null;

	this.uid = Particle._UID.value++;

	this.maxLifeTime = 0;
	this.lifeTime = 0;
	this.lifeProgress = 0;

	this.position = new Point();
	this.acceleration = new Point();
	this.velocity = new Point();

	this.size = new Point(1, 1);
	this.sizeStart = new Point();
	this.sizeEnd = new Point();

	this.color = new Color(255, 255, 255, 1);
	this.colorStart = new Color();
	this.colorEnd = new Color();
}

Particle.prototype.isDead = function() {
	return this.lifeTime >= this.maxLifeTime;
};

module.exports = Particle;
