(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
; var __browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {

/*
  I've wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
  so it's better encapsulated. Now you can have multiple random number generators
  and they won't stomp all over eachother's state.
  
  If you want to use this as a substitute for Math.random(), use the random()
  method like so:
  
  var m = new MersenneTwister();
  var randomNumber = m.random();
  
  You can also call the other genrand_{foo}() methods on the instance.

  If you want to use a specific seed in order to get a repeatable random
  sequence, pass an integer into the constructor:

  var m = new MersenneTwister(123);

  and that will always produce the same random sequence.

  Sean McCullough (banksean@gmail.com)
*/

/* 
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.
 
   Before using, initialize the state by using init_genrand(seed)  
   or init_by_array(init_key, key_length).
 
   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.                          
 
   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:
 
     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
 
     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
 
     3. The names of its contributors may not be used to endorse or promote 
        products derived from this software without specific prior written 
        permission.
 
   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 
 
   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/

var MersenneTwister = function(seed) {
  if (seed == undefined) {
    seed = new Date().getTime();
  } 
  /* Period parameters */  
  this.N = 624;
  this.M = 397;
  this.MATRIX_A = 0x9908b0df;   /* constant vector a */
  this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
  this.LOWER_MASK = 0x7fffffff; /* least significant r bits */
 
  this.mt = new Array(this.N); /* the array for the state vector */
  this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */

  this.init_genrand(seed);
}  
 
/* initializes mt[N] with a seed */
MersenneTwister.prototype.init_genrand = function(s) {
  this.mt[0] = s >>> 0;
  for (this.mti=1; this.mti<this.N; this.mti++) {
      var s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
   this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
  + this.mti;
      /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
      /* In the previous versions, MSBs of the seed affect   */
      /* only MSBs of the array mt[].                        */
      /* 2002/01/09 modified by Makoto Matsumoto             */
      this.mt[this.mti] >>>= 0;
      /* for >32 bit machines */
  }
}
 
/* initialize by an array with array-length */
/* init_key is the array for initializing keys */
/* key_length is its length */
/* slight change for C++, 2004/2/26 */
MersenneTwister.prototype.init_by_array = function(init_key, key_length) {
  var i, j, k;
  this.init_genrand(19650218);
  i=1; j=0;
  k = (this.N>key_length ? this.N : key_length);
  for (; k; k--) {
    var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30)
    this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525)))
      + init_key[j] + j; /* non linear */
    this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
    i++; j++;
    if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
    if (j>=key_length) j=0;
  }
  for (k=this.N-1; k; k--) {
    var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30);
    this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941))
      - i; /* non linear */
    this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
    i++;
    if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
  }

  this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */ 
}
 
/* generates a random number on [0,0xffffffff]-interval */
MersenneTwister.prototype.genrand_int32 = function() {
  var y;
  var mag01 = new Array(0x0, this.MATRIX_A);
  /* mag01[x] = x * MATRIX_A  for x=0,1 */

  if (this.mti >= this.N) { /* generate N words at one time */
    var kk;

    if (this.mti == this.N+1)   /* if init_genrand() has not been called, */
      this.init_genrand(5489); /* a default initial seed is used */

    for (kk=0;kk<this.N-this.M;kk++) {
      y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
      this.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    for (;kk<this.N-1;kk++) {
      y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
      this.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    y = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
    this.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];

    this.mti = 0;
  }

  y = this.mt[this.mti++];

  /* Tempering */
  y ^= (y >>> 11);
  y ^= (y << 7) & 0x9d2c5680;
  y ^= (y << 15) & 0xefc60000;
  y ^= (y >>> 18);

  return y >>> 0;
}
 
/* generates a random number on [0,0x7fffffff]-interval */
MersenneTwister.prototype.genrand_int31 = function() {
  return (this.genrand_int32()>>>1);
}
 
/* generates a random number on [0,1]-real-interval */
MersenneTwister.prototype.genrand_real1 = function() {
  return this.genrand_int32()*(1.0/4294967295.0); 
  /* divided by 2^32-1 */ 
}

/* generates a random number on [0,1)-real-interval */
MersenneTwister.prototype.random = function() {
  return this.genrand_int32()*(1.0/4294967296.0); 
  /* divided by 2^32 */
}
 
/* generates a random number on (0,1)-real-interval */
MersenneTwister.prototype.genrand_real3 = function() {
  return (this.genrand_int32() + 0.5)*(1.0/4294967296.0); 
  /* divided by 2^32 */
}
 
/* generates a random number on [0,1) with 53-bit resolution*/
MersenneTwister.prototype.genrand_res53 = function() { 
  var a=this.genrand_int32()>>>5, b=this.genrand_int32()>>>6; 
  return(a*67108864.0+b)*(1.0/9007199254740992.0); 
} 

/* These real versions are due to Isaku Wada, 2002/01/09 added */

; browserify_shim__define__module__export__(typeof MersenneTwister != "undefined" ? MersenneTwister : window.MersenneTwister);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
var EmitterBehaviours = require("model/EmitterBehaviours");
var LifeBehaviour = require("model/LifeBehaviour");
var ParticlePool = require("util/ParticlePool");

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

},{"model/EmitterBehaviours":6,"model/LifeBehaviour":7,"util/ParticlePool":13}],3:[function(require,module,exports){
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

},{"util/Color":10,"util/Point":14}],4:[function(require,module,exports){
var Random = require("util/Random");

function Behaviour() {
	this.priority = 0;

	//Todo: enable
	//Todo: easeing
}

Behaviour.prototype.init = function(particle) {
};

Behaviour.prototype.apply = function(particle, deltaTime) {
};

Behaviour.prototype.varianceFrom = function(value) {
	if (value === 0) return 0;
	return Random.uniform(-1.0, 1.0) * value;
};

module.exports = Behaviour;


},{"util/Random":15}],5:[function(require,module,exports){
var Behaviour = require("model/Behaviour");
var Color = require("util/Color");

ColorBehaviour.DEFAULT_PRIORITY = 0;

function ColorBehaviour() {
	Behaviour.call(this);

	this.priority = ColorBehaviour.DEFAULT_PRIORITY;

	this.colorStart = new Color();
	this.colorEnd = new Color();
	this.colorStartVariance = new Color();
	this.colorEndVariance = new Color();
}

ColorBehaviour.prototype = Object.create(Behaviour.prototype);
ColorBehaviour.prototype.constructor = ColorBehaviour;

ColorBehaviour.prototype.init = function(particle) {
	//todo optimalization??

	particle.colorStart.copyFrom(this.colorStart);
	particle.colorStart.r += this.varianceFrom(this.colorStartVariance.r);
	particle.colorStart.g += this.varianceFrom(this.colorStartVariance.g);
	particle.colorStart.b += this.varianceFrom(this.colorStartVariance.b);
	particle.colorStart.alpha += this.varianceFrom(this.colorStartVariance.alpha);

	particle.colorEnd.copyFrom(this.colorEnd);
	particle.colorEnd.r += this.varianceFrom(this.colorEndVariance.r);
	particle.colorEnd.g += this.varianceFrom(this.colorEndVariance.g);
	particle.colorEnd.b += this.varianceFrom(this.colorEndVariance.b);
	particle.colorEnd.alpha += this.varianceFrom(this.colorEndVariance.alpha);

	particle.color.copyFrom(particle.colorStart);
};

ColorBehaviour.prototype.apply = function(particle, deltaTime) {
	particle.color.copyFrom(particle.colorStart);

	particle.color.r += (particle.colorEnd.r - particle.colorStart.r) * particle.lifeProgress;
	particle.color.g += (particle.colorEnd.g - particle.colorStart.g) * particle.lifeProgress;
	particle.color.b += (particle.colorEnd.b - particle.colorStart.b) * particle.lifeProgress;
	particle.color.alpha += (particle.colorEnd.alpha - particle.colorStart.alpha) * particle.lifeProgress;
};

module.exports = ColorBehaviour;


},{"model/Behaviour":4,"util/Color":10}],6:[function(require,module,exports){

function EmitterBehaviours() {
	this.behaviours = [];
}

EmitterBehaviours.prototype.getAll = function() {
	return this.behaviours;
};

EmitterBehaviours.prototype.add = function(behaviour) {
	for (var i = 0; i < this.behaviours.length; ++i) {
		if(this.behaviours[i] === behaviour){
			throw new Error("Emitter duplicate");
		}
	}
	this.behaviours.push(behaviour);

	this.behaviours.sort(function(a, b) {
		return a.priority - b.priority;
	});

};

EmitterBehaviours.prototype.init = function(particle) {
	for (var i = 0; i < this.behaviours.length; ++i) {
		this.behaviours[i].init(particle);
	}
};

EmitterBehaviours.prototype.apply = function(particle, deltaTime) {
	for (var i = 0; i < this.behaviours.length; ++i) {
		this.behaviours[i].apply(particle, deltaTime);
	}
};

module.exports = EmitterBehaviours;
},{}],7:[function(require,module,exports){
var Behaviour = require("model/Behaviour");

LifeBehaviour.DEFAULT_PRIORITY = 10000;

function LifeBehaviour() {
	Behaviour.call(this);

	this.priority = LifeBehaviour.DEFAULT_PRIORITY;
	this.maxLifeTime = 0;
	this.timeVariance = 0;
}


LifeBehaviour.prototype = Object.create(Behaviour.prototype);
LifeBehaviour.prototype.constructor = LifeBehaviour;

LifeBehaviour.prototype.init = function(particle) {
	particle.lifeTime = 0;
	particle.lifeProgress = 0;

	particle.maxLifeTime = this.maxLifeTime + this.varianceFrom(this.timeVariance);
	particle.maxLifeTime = Math.max(particle.maxLifeTime, 0.0);
};

LifeBehaviour.prototype.apply = function(particle, deltaTime) {
	particle.lifeTime += deltaTime;

	if (particle.maxLifeTime > 0) {
		particle.lifeProgress = particle.lifeTime / particle.maxLifeTime;
	}

};

module.exports = LifeBehaviour;
},{"model/Behaviour":4}],8:[function(require,module,exports){
var Behaviour = require("model/Behaviour");
var Point = require("util/Point");

PositionBehaviour.DEFAULT_PRIORITY = 100;

function PositionBehaviour() {
	Behaviour.call(this);

	this.priority = PositionBehaviour.DEFAULT_PRIORITY;

	this.position = new Point();
	this.positionVariance = new Point();
	this.velocity = new Point();
	this.velocityVariance = new Point();
	this.acceleration = new Point();
	this.accelerationVariance = new Point();
}

PositionBehaviour.prototype = Object.create(Behaviour.prototype);
PositionBehaviour.prototype.constructor = PositionBehaviour;

PositionBehaviour.prototype.init = function(particle) {
	particle.position.x = this.calculate(this.position.x, this.positionVariance.x);
	particle.position.y = this.calculate(this.position.y, this.positionVariance.y);

	particle.velocity.x = this.calculate(this.velocity.x, this.velocityVariance.x);
	particle.velocity.y = this.calculate(this.velocity.y, this.velocityVariance.y);

	particle.acceleration.x = this.calculate(this.acceleration.x, this.accelerationVariance.x);
	particle.acceleration.y = this.calculate(this.acceleration.y, this.accelerationVariance.y);
};

PositionBehaviour.prototype.calculate = function(value, variance) {
	return value + this.varianceFrom(variance);
};

PositionBehaviour.prototype.apply = function(particle, deltaTime) {
	particle.velocity.x += (particle.acceleration.x * deltaTime);
	particle.velocity.y += (particle.acceleration.y * deltaTime);

	particle.position.x += (particle.velocity.x * deltaTime);
	particle.position.y += (particle.velocity.y * deltaTime);
};

module.exports = PositionBehaviour;
},{"model/Behaviour":4,"util/Point":14}],9:[function(require,module,exports){
var Behaviour = require("model/Behaviour");
var Point = require("util/Point");

SizeBehaviour.DEFAULT_PRIORITY = 0;

function SizeBehaviour() {
	Behaviour.call(this);

	this.priority = SizeBehaviour.DEFAULT_PRIORITY;

	this.allowNegativeValues = false;

	this.sizeStart = new Point();
	this.sizeEnd = new Point();
	this.startVariance = 0;
	this.endVariance = 0;
}

SizeBehaviour.prototype = Object.create(Behaviour.prototype);
SizeBehaviour.prototype.constructor = SizeBehaviour;

SizeBehaviour.prototype.init = function(particle) {
	//todo optimalization??

	var variance = this.varianceFrom(this.startVariance);
	particle.sizeStart.x = this.sizeStart.x + variance;
	particle.sizeStart.y = this.sizeStart.y + variance;

	variance = this.varianceFrom(this.endVariance);
	particle.sizeEnd.x = this.sizeEnd.x + variance;
	particle.sizeEnd.y = this.sizeEnd.y + variance;

	if (!this.allowNegativeValues) {
		particle.sizeStart.x = Math.max(particle.sizeStart.x, 0);
		particle.sizeStart.y = Math.max(particle.sizeStart.y, 0);
		particle.sizeEnd.x = Math.max(particle.sizeEnd.x, 0);
		particle.sizeEnd.y = Math.max(particle.sizeEnd.y, 0);
	}

	particle.size.copyFrom(particle.sizeStart);
};

SizeBehaviour.prototype.apply = function(particle, deltaTime) {
	particle.size.copyFrom(particle.sizeStart);
	particle.size.x += (particle.sizeEnd.x - particle.sizeStart.x) * particle.lifeProgress;
	particle.size.y += (particle.sizeEnd.y - particle.sizeStart.y) * particle.lifeProgress;
};

module.exports = SizeBehaviour;
},{"model/Behaviour":4,"util/Point":14}],10:[function(require,module,exports){
var MathUtil = require("util/MathUtil");

function Color(r, g, b, alpha) {
	this.r = r || 0;
	this.g = g || 0;
	this.b = b || 0;
	this.alpha = alpha || 0;
}

Color.prototype.copyFrom = function(color) {
	this.r = color.r;
	this.g = color.g;
	this.b = color.b;
	this.alpha = color.alpha;
};

Color.prototype.add = function(color) {
	this.r += color.r;
	this.g += color.g;
	this.b += color.b;
	this.alpha += color.alpha;
};

Color.prototype.set = function(r,g,b,a) {
	this.r = r || 0;
	this.g = g || 0;
	this.b = b || 0;
	this.alpha = a || 0;
};

Object.defineProperty(Color.prototype, "hex", {
	get: function() {
		var hex = this.r << 16;
		hex = hex | this.g << 8;
		hex = hex | this.b;
		return hex;
	},
	set: function(value) {
		this.r = (value & 0xFF0000) >> 16;
		this.g = (value & 0xFF00) >> 8;
		this.b = (value & 0xFF);
	}
});

Object.defineProperty(Color.prototype, "r", {
	get: function() {
		return this._r;
	},
	set: function(value) {
		this._r = MathUtil.clamp(value, 0, 255);
	}
});

Object.defineProperty(Color.prototype, "g", {
	get: function() {
		return this._g;
	},
	set: function(value) {
		this._g = MathUtil.clamp(value, 0, 255);
	}
});

Object.defineProperty(Color.prototype, "b", {
	get: function() {
		return this._b;
	},
	set: function(value) {
		this._b = MathUtil.clamp(value, 0, 255);
	}
});


Object.defineProperty(Color.prototype, "alpha", {
	get: function() {
		return this._alpha;
	},
	set: function(value) {
		this._alpha = MathUtil.clamp(value, 0, 1);
	}
});

module.exports = Color;
},{"util/MathUtil":12}],11:[function(require,module,exports){
function List() {
	this.first = null;
	this.length = 0;
}

List.prototype.isEmpty = function() {
	return this.first === null;
};

List.prototype.add = function(item) {
	item.prev = null;
	item.next = null;
	if (this.first) {
		this.first.prev = item;
	}

	item.next = this.first;
	this.first = item;
	this.length++;
	return item;
};

List.prototype.forEach = function(callback) {
	var current = this.first;
	var next = null;
	while (current) {
		next = current.next;
		callback(current);
		current = next;
	}
};

List.prototype.remove = function(item) {
	var previous = item.prev;
	var next = item.next;

	if (previous)
		previous.next = next;

	if (next)
		next.prev = previous;

	if (this.first === item)
		this.first = item.next;

	item.prev = null;
	item.next = null;
	this.length--;
};

module.exports = List;

},{}],12:[function(require,module,exports){
function MathUtil() {
}

MathUtil.EPSILON = 2.220446049250313e-16;

MathUtil.clamp = function(value, min, max) {
	return Math.max(min, Math.min(value, max));
};

MathUtil.areEqual = function(a, b) {
	return Math.abs(a - b) < MathUtil.EPSILON;
};

module.exports = MathUtil;
},{}],13:[function(require,module,exports){
var Particle = require("model/Particle");

ParticlePool.global = new ParticlePool();

function ParticlePool() {
	this.first = null;
}

ParticlePool.prototype.pop = function() {
	if (!this.first)
		return this.create();

	var current = this.first;
	this.first = current.next;
	current.next = null;
	return current;
};

ParticlePool.prototype.create = function() {
	return new Particle();
};

ParticlePool.prototype.push = function(particle) {
	particle.next = this.first;
	this.first = particle;
};

module.exports = ParticlePool;
},{"model/Particle":3}],14:[function(require,module,exports){

function Point(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

Point.prototype.set = function(x, y) {
	this.x = x;
	this.y = y === undefined ? this.y : y;
	return this;
};

Point.prototype.copyFrom = function(point) {
	this.x = point.x;
	this.y = point.y;
	return this;
};

Point.prototype.multiplayByScalar = function(scalar) {
	this.x *= scalar;
	this.y *= scalar;
	return this;
};

Point.prototype.add = function(point) {
	this.x += point.x;
	this.y += point.y;
	return this;
};

module.exports = Point;
},{}],15:[function(require,module,exports){
var MersenneTwister = require("MersenneTwister");

Random.marsenneTwister = new MersenneTwister();
function Random() {
}

Random.get = function() {
	return Random.uniform(0.0, 1.0);
};

Random.uniform = function(min, max) {
	return Random.marsenneTwister.genrand_real1() * (max - min) + min; // jshint ignore:line
};

module.exports = Random;

},{"MersenneTwister":1}]},{},[2,3,4,5,6,7,8,9,10,11,12,13,14,15])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvbWVyc2VubmUtdHdpc3Rlci5qcyIsInNyYy9tb2RlbC9FbWl0dGVyLmpzIiwic3JjL21vZGVsL1BhcnRpY2xlLmpzIiwic3JjL21vZGVsL2JlaGF2aW91ci9CZWhhdmlvdXIuanMiLCJzcmMvbW9kZWwvYmVoYXZpb3VyL0NvbG9yQmVoYXZpb3VyLmpzIiwic3JjL21vZGVsL2JlaGF2aW91ci9FbWl0dGVyQmVoYXZpb3Vycy5qcyIsInNyYy9tb2RlbC9iZWhhdmlvdXIvTGlmZUJlaGF2aW91ci5qcyIsInNyYy9tb2RlbC9iZWhhdmlvdXIvUG9zaXRpb25CZWhhdmlvdXIuanMiLCJzcmMvbW9kZWwvYmVoYXZpb3VyL1NpemVCZWhhdmlvdXIuanMiLCJzcmMvdXRpbC9Db2xvci5qcyIsInNyYy91dGlsL0xpc3QuanMiLCJzcmMvdXRpbC9NYXRoVXRpbC5qcyIsInNyYy91dGlsL1BhcnRpY2xlUG9vbC5qcyIsInNyYy91dGlsL1BvaW50LmpzIiwic3JjL3V0aWwvUmFuZG9tLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMxTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIjsgdmFyIF9fYnJvd3NlcmlmeV9zaGltX3JlcXVpcmVfXz1yZXF1aXJlOyhmdW5jdGlvbiBicm93c2VyaWZ5U2hpbShtb2R1bGUsIGV4cG9ydHMsIHJlcXVpcmUsIGRlZmluZSwgYnJvd3NlcmlmeV9zaGltX19kZWZpbmVfX21vZHVsZV9fZXhwb3J0X18pIHtcblxuLypcbiAgSSd2ZSB3cmFwcGVkIE1ha290byBNYXRzdW1vdG8gYW5kIFRha3VqaSBOaXNoaW11cmEncyBjb2RlIGluIGEgbmFtZXNwYWNlXG4gIHNvIGl0J3MgYmV0dGVyIGVuY2Fwc3VsYXRlZC4gTm93IHlvdSBjYW4gaGF2ZSBtdWx0aXBsZSByYW5kb20gbnVtYmVyIGdlbmVyYXRvcnNcbiAgYW5kIHRoZXkgd29uJ3Qgc3RvbXAgYWxsIG92ZXIgZWFjaG90aGVyJ3Mgc3RhdGUuXG4gIFxuICBJZiB5b3Ugd2FudCB0byB1c2UgdGhpcyBhcyBhIHN1YnN0aXR1dGUgZm9yIE1hdGgucmFuZG9tKCksIHVzZSB0aGUgcmFuZG9tKClcbiAgbWV0aG9kIGxpa2Ugc286XG4gIFxuICB2YXIgbSA9IG5ldyBNZXJzZW5uZVR3aXN0ZXIoKTtcbiAgdmFyIHJhbmRvbU51bWJlciA9IG0ucmFuZG9tKCk7XG4gIFxuICBZb3UgY2FuIGFsc28gY2FsbCB0aGUgb3RoZXIgZ2VucmFuZF97Zm9vfSgpIG1ldGhvZHMgb24gdGhlIGluc3RhbmNlLlxuXG4gIElmIHlvdSB3YW50IHRvIHVzZSBhIHNwZWNpZmljIHNlZWQgaW4gb3JkZXIgdG8gZ2V0IGEgcmVwZWF0YWJsZSByYW5kb21cbiAgc2VxdWVuY2UsIHBhc3MgYW4gaW50ZWdlciBpbnRvIHRoZSBjb25zdHJ1Y3RvcjpcblxuICB2YXIgbSA9IG5ldyBNZXJzZW5uZVR3aXN0ZXIoMTIzKTtcblxuICBhbmQgdGhhdCB3aWxsIGFsd2F5cyBwcm9kdWNlIHRoZSBzYW1lIHJhbmRvbSBzZXF1ZW5jZS5cblxuICBTZWFuIE1jQ3VsbG91Z2ggKGJhbmtzZWFuQGdtYWlsLmNvbSlcbiovXG5cbi8qIFxuICAgQSBDLXByb2dyYW0gZm9yIE1UMTk5MzcsIHdpdGggaW5pdGlhbGl6YXRpb24gaW1wcm92ZWQgMjAwMi8xLzI2LlxuICAgQ29kZWQgYnkgVGFrdWppIE5pc2hpbXVyYSBhbmQgTWFrb3RvIE1hdHN1bW90by5cbiBcbiAgIEJlZm9yZSB1c2luZywgaW5pdGlhbGl6ZSB0aGUgc3RhdGUgYnkgdXNpbmcgaW5pdF9nZW5yYW5kKHNlZWQpICBcbiAgIG9yIGluaXRfYnlfYXJyYXkoaW5pdF9rZXksIGtleV9sZW5ndGgpLlxuIFxuICAgQ29weXJpZ2h0IChDKSAxOTk3IC0gMjAwMiwgTWFrb3RvIE1hdHN1bW90byBhbmQgVGFrdWppIE5pc2hpbXVyYSxcbiAgIEFsbCByaWdodHMgcmVzZXJ2ZWQuICAgICAgICAgICAgICAgICAgICAgICAgICBcbiBcbiAgIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICAgbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zXG4gICBhcmUgbWV0OlxuIFxuICAgICAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodFxuICAgICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gXG4gICAgIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0XG4gICAgICAgIG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGVcbiAgICAgICAgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiBcbiAgICAgMy4gVGhlIG5hbWVzIG9mIGl0cyBjb250cmlidXRvcnMgbWF5IG5vdCBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBcbiAgICAgICAgcHJvZHVjdHMgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIFxuICAgICAgICBwZXJtaXNzaW9uLlxuIFxuICAgVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SU1xuICAgXCJBUyBJU1wiIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVFxuICAgTElNSVRFRCBUTywgVEhFIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SXG4gICBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC4gIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgT1dORVIgT1JcbiAgIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLFxuICAgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLFxuICAgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SXG4gICBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GXG4gICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElOR1xuICAgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG4gICBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiBcbiBcbiAgIEFueSBmZWVkYmFjayBpcyB2ZXJ5IHdlbGNvbWUuXG4gICBodHRwOi8vd3d3Lm1hdGguc2NpLmhpcm9zaGltYS11LmFjLmpwL35tLW1hdC9NVC9lbXQuaHRtbFxuICAgZW1haWw6IG0tbWF0IEAgbWF0aC5zY2kuaGlyb3NoaW1hLXUuYWMuanAgKHJlbW92ZSBzcGFjZSlcbiovXG5cbnZhciBNZXJzZW5uZVR3aXN0ZXIgPSBmdW5jdGlvbihzZWVkKSB7XG4gIGlmIChzZWVkID09IHVuZGVmaW5lZCkge1xuICAgIHNlZWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgfSBcbiAgLyogUGVyaW9kIHBhcmFtZXRlcnMgKi8gIFxuICB0aGlzLk4gPSA2MjQ7XG4gIHRoaXMuTSA9IDM5NztcbiAgdGhpcy5NQVRSSVhfQSA9IDB4OTkwOGIwZGY7ICAgLyogY29uc3RhbnQgdmVjdG9yIGEgKi9cbiAgdGhpcy5VUFBFUl9NQVNLID0gMHg4MDAwMDAwMDsgLyogbW9zdCBzaWduaWZpY2FudCB3LXIgYml0cyAqL1xuICB0aGlzLkxPV0VSX01BU0sgPSAweDdmZmZmZmZmOyAvKiBsZWFzdCBzaWduaWZpY2FudCByIGJpdHMgKi9cbiBcbiAgdGhpcy5tdCA9IG5ldyBBcnJheSh0aGlzLk4pOyAvKiB0aGUgYXJyYXkgZm9yIHRoZSBzdGF0ZSB2ZWN0b3IgKi9cbiAgdGhpcy5tdGk9dGhpcy5OKzE7IC8qIG10aT09TisxIG1lYW5zIG10W05dIGlzIG5vdCBpbml0aWFsaXplZCAqL1xuXG4gIHRoaXMuaW5pdF9nZW5yYW5kKHNlZWQpO1xufSAgXG4gXG4vKiBpbml0aWFsaXplcyBtdFtOXSB3aXRoIGEgc2VlZCAqL1xuTWVyc2VubmVUd2lzdGVyLnByb3RvdHlwZS5pbml0X2dlbnJhbmQgPSBmdW5jdGlvbihzKSB7XG4gIHRoaXMubXRbMF0gPSBzID4+PiAwO1xuICBmb3IgKHRoaXMubXRpPTE7IHRoaXMubXRpPHRoaXMuTjsgdGhpcy5tdGkrKykge1xuICAgICAgdmFyIHMgPSB0aGlzLm10W3RoaXMubXRpLTFdIF4gKHRoaXMubXRbdGhpcy5tdGktMV0gPj4+IDMwKTtcbiAgIHRoaXMubXRbdGhpcy5tdGldID0gKCgoKChzICYgMHhmZmZmMDAwMCkgPj4+IDE2KSAqIDE4MTI0MzMyNTMpIDw8IDE2KSArIChzICYgMHgwMDAwZmZmZikgKiAxODEyNDMzMjUzKVxuICArIHRoaXMubXRpO1xuICAgICAgLyogU2VlIEtudXRoIFRBT0NQIFZvbDIuIDNyZCBFZC4gUC4xMDYgZm9yIG11bHRpcGxpZXIuICovXG4gICAgICAvKiBJbiB0aGUgcHJldmlvdXMgdmVyc2lvbnMsIE1TQnMgb2YgdGhlIHNlZWQgYWZmZWN0ICAgKi9cbiAgICAgIC8qIG9ubHkgTVNCcyBvZiB0aGUgYXJyYXkgbXRbXS4gICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgLyogMjAwMi8wMS8wOSBtb2RpZmllZCBieSBNYWtvdG8gTWF0c3Vtb3RvICAgICAgICAgICAgICovXG4gICAgICB0aGlzLm10W3RoaXMubXRpXSA+Pj49IDA7XG4gICAgICAvKiBmb3IgPjMyIGJpdCBtYWNoaW5lcyAqL1xuICB9XG59XG4gXG4vKiBpbml0aWFsaXplIGJ5IGFuIGFycmF5IHdpdGggYXJyYXktbGVuZ3RoICovXG4vKiBpbml0X2tleSBpcyB0aGUgYXJyYXkgZm9yIGluaXRpYWxpemluZyBrZXlzICovXG4vKiBrZXlfbGVuZ3RoIGlzIGl0cyBsZW5ndGggKi9cbi8qIHNsaWdodCBjaGFuZ2UgZm9yIEMrKywgMjAwNC8yLzI2ICovXG5NZXJzZW5uZVR3aXN0ZXIucHJvdG90eXBlLmluaXRfYnlfYXJyYXkgPSBmdW5jdGlvbihpbml0X2tleSwga2V5X2xlbmd0aCkge1xuICB2YXIgaSwgaiwgaztcbiAgdGhpcy5pbml0X2dlbnJhbmQoMTk2NTAyMTgpO1xuICBpPTE7IGo9MDtcbiAgayA9ICh0aGlzLk4+a2V5X2xlbmd0aCA/IHRoaXMuTiA6IGtleV9sZW5ndGgpO1xuICBmb3IgKDsgazsgay0tKSB7XG4gICAgdmFyIHMgPSB0aGlzLm10W2ktMV0gXiAodGhpcy5tdFtpLTFdID4+PiAzMClcbiAgICB0aGlzLm10W2ldID0gKHRoaXMubXRbaV0gXiAoKCgoKHMgJiAweGZmZmYwMDAwKSA+Pj4gMTYpICogMTY2NDUyNSkgPDwgMTYpICsgKChzICYgMHgwMDAwZmZmZikgKiAxNjY0NTI1KSkpXG4gICAgICArIGluaXRfa2V5W2pdICsgajsgLyogbm9uIGxpbmVhciAqL1xuICAgIHRoaXMubXRbaV0gPj4+PSAwOyAvKiBmb3IgV09SRFNJWkUgPiAzMiBtYWNoaW5lcyAqL1xuICAgIGkrKzsgaisrO1xuICAgIGlmIChpPj10aGlzLk4pIHsgdGhpcy5tdFswXSA9IHRoaXMubXRbdGhpcy5OLTFdOyBpPTE7IH1cbiAgICBpZiAoaj49a2V5X2xlbmd0aCkgaj0wO1xuICB9XG4gIGZvciAoaz10aGlzLk4tMTsgazsgay0tKSB7XG4gICAgdmFyIHMgPSB0aGlzLm10W2ktMV0gXiAodGhpcy5tdFtpLTFdID4+PiAzMCk7XG4gICAgdGhpcy5tdFtpXSA9ICh0aGlzLm10W2ldIF4gKCgoKChzICYgMHhmZmZmMDAwMCkgPj4+IDE2KSAqIDE1NjYwODM5NDEpIDw8IDE2KSArIChzICYgMHgwMDAwZmZmZikgKiAxNTY2MDgzOTQxKSlcbiAgICAgIC0gaTsgLyogbm9uIGxpbmVhciAqL1xuICAgIHRoaXMubXRbaV0gPj4+PSAwOyAvKiBmb3IgV09SRFNJWkUgPiAzMiBtYWNoaW5lcyAqL1xuICAgIGkrKztcbiAgICBpZiAoaT49dGhpcy5OKSB7IHRoaXMubXRbMF0gPSB0aGlzLm10W3RoaXMuTi0xXTsgaT0xOyB9XG4gIH1cblxuICB0aGlzLm10WzBdID0gMHg4MDAwMDAwMDsgLyogTVNCIGlzIDE7IGFzc3VyaW5nIG5vbi16ZXJvIGluaXRpYWwgYXJyYXkgKi8gXG59XG4gXG4vKiBnZW5lcmF0ZXMgYSByYW5kb20gbnVtYmVyIG9uIFswLDB4ZmZmZmZmZmZdLWludGVydmFsICovXG5NZXJzZW5uZVR3aXN0ZXIucHJvdG90eXBlLmdlbnJhbmRfaW50MzIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHk7XG4gIHZhciBtYWcwMSA9IG5ldyBBcnJheSgweDAsIHRoaXMuTUFUUklYX0EpO1xuICAvKiBtYWcwMVt4XSA9IHggKiBNQVRSSVhfQSAgZm9yIHg9MCwxICovXG5cbiAgaWYgKHRoaXMubXRpID49IHRoaXMuTikgeyAvKiBnZW5lcmF0ZSBOIHdvcmRzIGF0IG9uZSB0aW1lICovXG4gICAgdmFyIGtrO1xuXG4gICAgaWYgKHRoaXMubXRpID09IHRoaXMuTisxKSAgIC8qIGlmIGluaXRfZ2VucmFuZCgpIGhhcyBub3QgYmVlbiBjYWxsZWQsICovXG4gICAgICB0aGlzLmluaXRfZ2VucmFuZCg1NDg5KTsgLyogYSBkZWZhdWx0IGluaXRpYWwgc2VlZCBpcyB1c2VkICovXG5cbiAgICBmb3IgKGtrPTA7a2s8dGhpcy5OLXRoaXMuTTtraysrKSB7XG4gICAgICB5ID0gKHRoaXMubXRba2tdJnRoaXMuVVBQRVJfTUFTSyl8KHRoaXMubXRba2srMV0mdGhpcy5MT1dFUl9NQVNLKTtcbiAgICAgIHRoaXMubXRba2tdID0gdGhpcy5tdFtrayt0aGlzLk1dIF4gKHkgPj4+IDEpIF4gbWFnMDFbeSAmIDB4MV07XG4gICAgfVxuICAgIGZvciAoO2trPHRoaXMuTi0xO2trKyspIHtcbiAgICAgIHkgPSAodGhpcy5tdFtra10mdGhpcy5VUFBFUl9NQVNLKXwodGhpcy5tdFtraysxXSZ0aGlzLkxPV0VSX01BU0spO1xuICAgICAgdGhpcy5tdFtra10gPSB0aGlzLm10W2trKyh0aGlzLk0tdGhpcy5OKV0gXiAoeSA+Pj4gMSkgXiBtYWcwMVt5ICYgMHgxXTtcbiAgICB9XG4gICAgeSA9ICh0aGlzLm10W3RoaXMuTi0xXSZ0aGlzLlVQUEVSX01BU0spfCh0aGlzLm10WzBdJnRoaXMuTE9XRVJfTUFTSyk7XG4gICAgdGhpcy5tdFt0aGlzLk4tMV0gPSB0aGlzLm10W3RoaXMuTS0xXSBeICh5ID4+PiAxKSBeIG1hZzAxW3kgJiAweDFdO1xuXG4gICAgdGhpcy5tdGkgPSAwO1xuICB9XG5cbiAgeSA9IHRoaXMubXRbdGhpcy5tdGkrK107XG5cbiAgLyogVGVtcGVyaW5nICovXG4gIHkgXj0gKHkgPj4+IDExKTtcbiAgeSBePSAoeSA8PCA3KSAmIDB4OWQyYzU2ODA7XG4gIHkgXj0gKHkgPDwgMTUpICYgMHhlZmM2MDAwMDtcbiAgeSBePSAoeSA+Pj4gMTgpO1xuXG4gIHJldHVybiB5ID4+PiAwO1xufVxuIFxuLyogZ2VuZXJhdGVzIGEgcmFuZG9tIG51bWJlciBvbiBbMCwweDdmZmZmZmZmXS1pbnRlcnZhbCAqL1xuTWVyc2VubmVUd2lzdGVyLnByb3RvdHlwZS5nZW5yYW5kX2ludDMxID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAodGhpcy5nZW5yYW5kX2ludDMyKCk+Pj4xKTtcbn1cbiBcbi8qIGdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgb24gWzAsMV0tcmVhbC1pbnRlcnZhbCAqL1xuTWVyc2VubmVUd2lzdGVyLnByb3RvdHlwZS5nZW5yYW5kX3JlYWwxID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmdlbnJhbmRfaW50MzIoKSooMS4wLzQyOTQ5NjcyOTUuMCk7IFxuICAvKiBkaXZpZGVkIGJ5IDJeMzItMSAqLyBcbn1cblxuLyogZ2VuZXJhdGVzIGEgcmFuZG9tIG51bWJlciBvbiBbMCwxKS1yZWFsLWludGVydmFsICovXG5NZXJzZW5uZVR3aXN0ZXIucHJvdG90eXBlLnJhbmRvbSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5nZW5yYW5kX2ludDMyKCkqKDEuMC80Mjk0OTY3Mjk2LjApOyBcbiAgLyogZGl2aWRlZCBieSAyXjMyICovXG59XG4gXG4vKiBnZW5lcmF0ZXMgYSByYW5kb20gbnVtYmVyIG9uICgwLDEpLXJlYWwtaW50ZXJ2YWwgKi9cbk1lcnNlbm5lVHdpc3Rlci5wcm90b3R5cGUuZ2VucmFuZF9yZWFsMyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gKHRoaXMuZ2VucmFuZF9pbnQzMigpICsgMC41KSooMS4wLzQyOTQ5NjcyOTYuMCk7IFxuICAvKiBkaXZpZGVkIGJ5IDJeMzIgKi9cbn1cbiBcbi8qIGdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgb24gWzAsMSkgd2l0aCA1My1iaXQgcmVzb2x1dGlvbiovXG5NZXJzZW5uZVR3aXN0ZXIucHJvdG90eXBlLmdlbnJhbmRfcmVzNTMgPSBmdW5jdGlvbigpIHsgXG4gIHZhciBhPXRoaXMuZ2VucmFuZF9pbnQzMigpPj4+NSwgYj10aGlzLmdlbnJhbmRfaW50MzIoKT4+PjY7IFxuICByZXR1cm4oYSo2NzEwODg2NC4wK2IpKigxLjAvOTAwNzE5OTI1NDc0MDk5Mi4wKTsgXG59IFxuXG4vKiBUaGVzZSByZWFsIHZlcnNpb25zIGFyZSBkdWUgdG8gSXNha3UgV2FkYSwgMjAwMi8wMS8wOSBhZGRlZCAqL1xuXG47IGJyb3dzZXJpZnlfc2hpbV9fZGVmaW5lX19tb2R1bGVfX2V4cG9ydF9fKHR5cGVvZiBNZXJzZW5uZVR3aXN0ZXIgIT0gXCJ1bmRlZmluZWRcIiA/IE1lcnNlbm5lVHdpc3RlciA6IHdpbmRvdy5NZXJzZW5uZVR3aXN0ZXIpO1xuXG59KS5jYWxsKGdsb2JhbCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBmdW5jdGlvbiBkZWZpbmVFeHBvcnQoZXgpIHsgbW9kdWxlLmV4cG9ydHMgPSBleDsgfSk7XG4iLCJ2YXIgRW1pdHRlckJlaGF2aW91cnMgPSByZXF1aXJlKFwibW9kZWwvRW1pdHRlckJlaGF2aW91cnNcIik7XG52YXIgTGlmZUJlaGF2aW91ciA9IHJlcXVpcmUoXCJtb2RlbC9MaWZlQmVoYXZpb3VyXCIpO1xudmFyIFBhcnRpY2xlUG9vbCA9IHJlcXVpcmUoXCJ1dGlsL1BhcnRpY2xlUG9vbFwiKTtcblxuZnVuY3Rpb24gRW1pdHRlcihvYnNlcnZlcikge1xuXG5cdHRoaXMuZW1pdFBlckZyYW1lID0gMTtcblx0dGhpcy5tYXhQYXJ0aWNsZXMgPSAwO1xuXHR0aGlzLmxpc3QgPSBuZXcgTGlzdCgpO1xuXHR0aGlzLmJlaGF2aW91cyA9IG5ldyBFbWl0dGVyQmVoYXZpb3VycygpO1xuXG5cdHRoaXMubGlmZUJlaGF2aW91ciA9IG5ldyBMaWZlQmVoYXZpb3VyKCk7IC8vVE9ETzogcmVtb3ZlZCB0aGlzIGRlcGVuZGVuY3lcblx0dGhpcy5iZWhhdmlvdXMuYWRkKHRoaXMubGlmZUJlaGF2aW91cik7XG5cblx0dGhpcy5wbGF5ID0gdHJ1ZTtcblx0dGhpcy5mcmFtZXMgPSAwO1xuXG5cdHRoaXMuc2V0T2JzZXJ2ZXIob2JzZXJ2ZXIpO1xufVxuXG5FbWl0dGVyLnByb3RvdHlwZS5zZXRPYnNlcnZlciA9IGZ1bmN0aW9uKG9ic2VydmVyKSB7XG5cdHZhciBudWxsRnVuY3Rpb24gPSBmdW5jdGlvbigpIHtcblx0fTtcblxuXHR0aGlzLm9ic2VydmVyID0gb2JzZXJ2ZXIgfHwge307XG5cdHRoaXMub2JzZXJ2ZXIub25DcmVhdGUgPSB0aGlzLm9ic2VydmVyLm9uQ3JlYXRlIHx8IG51bGxGdW5jdGlvbjtcblx0dGhpcy5vYnNlcnZlci5vblVwZGF0ZSA9IHRoaXMub2JzZXJ2ZXIub25VcGRhdGUgfHwgbnVsbEZ1bmN0aW9uO1xuXHR0aGlzLm9ic2VydmVyLm9uUmVtb3ZlID0gdGhpcy5vYnNlcnZlci5vblJlbW92ZSB8fCBudWxsRnVuY3Rpb247XG5cbn07XG5cbkVtaXR0ZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKGRlbHRhVGltZSkge1xuXHRpZighdGhpcy5wbGF5KSByZXR1cm47XG5cblx0dGhpcy5jcmVhdGVQYXJ0aWNsZXMoZGVsdGFUaW1lKTtcblxuXHR0aGlzLmxpc3QuZm9yRWFjaChmdW5jdGlvbihwYXJ0aWNsZSkge1xuXHRcdHRoaXMudXBkYXRlUGFydGljbGUocGFydGljbGUsIGRlbHRhVGltZSk7XG5cdH0uYmluZCh0aGlzKSk7XG59O1xuXG5FbWl0dGVyLnByb3RvdHlwZS5jcmVhdGVQYXJ0aWNsZXMgPSBmdW5jdGlvbihkZWx0YVRpbWUpIHtcblx0dmFyIGVtaXRQZXJTZWMgPSB0aGlzLm1heFBhcnRpY2xlcy90aGlzLmxpZmVCZWhhdmlvdXIubWF4TGlmZVRpbWU7XG5cdHZhciBmcHMgPSAgMS9kZWx0YVRpbWU7XG5cdHZhciByYXRpbyA9IChlbWl0UGVyU2VjL2Zwcyk7XG5cdHRoaXMuZnJhbWVzICs9IHJhdGlvO1xuXG5cblxuXHRpZih0aGlzLmZyYW1lcyA+PSAxLjApe1xuXHRcdHZhciB0b0VtaXQgPSBNYXRoLnJvdW5kKHRoaXMuZnJhbWVzKTtcblx0XHR0aGlzLmZyYW1lcyA9IDA7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0b0VtaXQ7ICsraSkge1xuXHRcdFx0dmFyIHBhcnRpY2xlID0gdGhpcy5saXN0LmFkZChQYXJ0aWNsZVBvb2wuZ2xvYmFsLnBvcCgpKTtcblx0XHRcdHRoaXMuYmVoYXZpb3VzLmluaXQocGFydGljbGUpO1xuXHRcdFx0dGhpcy5vYnNlcnZlci5vbkNyZWF0ZShwYXJ0aWNsZSk7XG5cdFx0fVxuXHR9XG5cbn07XG5cbkVtaXR0ZXIucHJvdG90eXBlLnVwZGF0ZVBhcnRpY2xlID0gZnVuY3Rpb24ocGFydGljbGUsIGRlbHRhVGltZSkge1xuXHRpZiAocGFydGljbGUuaXNEZWFkKCkpIHtcblx0XHR0aGlzLm9ic2VydmVyLm9uUmVtb3ZlKHBhcnRpY2xlKTtcblx0XHR0aGlzLmxpc3QucmVtb3ZlKHBhcnRpY2xlKTtcblx0XHRQYXJ0aWNsZVBvb2wuZ2xvYmFsLnB1c2gocGFydGljbGUpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHRoaXMuYmVoYXZpb3VzLmFwcGx5KHBhcnRpY2xlLCBkZWx0YVRpbWUpO1xuXHRcdHRoaXMub2JzZXJ2ZXIub25VcGRhdGUocGFydGljbGUpO1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XG4iLCJ2YXIgUG9pbnQgPSByZXF1aXJlKFwidXRpbC9Qb2ludFwiKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoXCJ1dGlsL0NvbG9yXCIpO1xuXG5QYXJ0aWNsZS5fVUlEID0gUGFydGljbGUuX1VJRCB8fCB7dmFsdWU6IDB9O1xuXG5mdW5jdGlvbiBQYXJ0aWNsZSgpIHtcblx0dGhpcy5uZXh0ID0gbnVsbDtcblx0dGhpcy5wcmV2ID0gbnVsbDtcblxuXHR0aGlzLnVpZCA9IFBhcnRpY2xlLl9VSUQudmFsdWUrKztcblxuXHR0aGlzLm1heExpZmVUaW1lID0gMDtcblx0dGhpcy5saWZlVGltZSA9IDA7XG5cdHRoaXMubGlmZVByb2dyZXNzID0gMDtcblxuXHR0aGlzLnBvc2l0aW9uID0gbmV3IFBvaW50KCk7XG5cdHRoaXMuYWNjZWxlcmF0aW9uID0gbmV3IFBvaW50KCk7XG5cdHRoaXMudmVsb2NpdHkgPSBuZXcgUG9pbnQoKTtcblxuXHR0aGlzLnNpemUgPSBuZXcgUG9pbnQoMSwgMSk7XG5cdHRoaXMuc2l6ZVN0YXJ0ID0gbmV3IFBvaW50KCk7XG5cdHRoaXMuc2l6ZUVuZCA9IG5ldyBQb2ludCgpO1xuXG5cdHRoaXMuY29sb3IgPSBuZXcgQ29sb3IoMjU1LCAyNTUsIDI1NSwgMSk7XG5cdHRoaXMuY29sb3JTdGFydCA9IG5ldyBDb2xvcigpO1xuXHR0aGlzLmNvbG9yRW5kID0gbmV3IENvbG9yKCk7XG59XG5cblBhcnRpY2xlLnByb3RvdHlwZS5pc0RlYWQgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMubGlmZVRpbWUgPj0gdGhpcy5tYXhMaWZlVGltZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGFydGljbGU7XG4iLCJ2YXIgUmFuZG9tID0gcmVxdWlyZShcInV0aWwvUmFuZG9tXCIpO1xuXG5mdW5jdGlvbiBCZWhhdmlvdXIoKSB7XG5cdHRoaXMucHJpb3JpdHkgPSAwO1xuXG5cdC8vVG9kbzogZW5hYmxlXG5cdC8vVG9kbzogZWFzZWluZ1xufVxuXG5CZWhhdmlvdXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbihwYXJ0aWNsZSkge1xufTtcblxuQmVoYXZpb3VyLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uKHBhcnRpY2xlLCBkZWx0YVRpbWUpIHtcbn07XG5cbkJlaGF2aW91ci5wcm90b3R5cGUudmFyaWFuY2VGcm9tID0gZnVuY3Rpb24odmFsdWUpIHtcblx0aWYgKHZhbHVlID09PSAwKSByZXR1cm4gMDtcblx0cmV0dXJuIFJhbmRvbS51bmlmb3JtKC0xLjAsIDEuMCkgKiB2YWx1ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQmVoYXZpb3VyO1xuXG4iLCJ2YXIgQmVoYXZpb3VyID0gcmVxdWlyZShcIm1vZGVsL0JlaGF2aW91clwiKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoXCJ1dGlsL0NvbG9yXCIpO1xuXG5Db2xvckJlaGF2aW91ci5ERUZBVUxUX1BSSU9SSVRZID0gMDtcblxuZnVuY3Rpb24gQ29sb3JCZWhhdmlvdXIoKSB7XG5cdEJlaGF2aW91ci5jYWxsKHRoaXMpO1xuXG5cdHRoaXMucHJpb3JpdHkgPSBDb2xvckJlaGF2aW91ci5ERUZBVUxUX1BSSU9SSVRZO1xuXG5cdHRoaXMuY29sb3JTdGFydCA9IG5ldyBDb2xvcigpO1xuXHR0aGlzLmNvbG9yRW5kID0gbmV3IENvbG9yKCk7XG5cdHRoaXMuY29sb3JTdGFydFZhcmlhbmNlID0gbmV3IENvbG9yKCk7XG5cdHRoaXMuY29sb3JFbmRWYXJpYW5jZSA9IG5ldyBDb2xvcigpO1xufVxuXG5Db2xvckJlaGF2aW91ci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJlaGF2aW91ci5wcm90b3R5cGUpO1xuQ29sb3JCZWhhdmlvdXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29sb3JCZWhhdmlvdXI7XG5cbkNvbG9yQmVoYXZpb3VyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24ocGFydGljbGUpIHtcblx0Ly90b2RvIG9wdGltYWxpemF0aW9uPz9cblxuXHRwYXJ0aWNsZS5jb2xvclN0YXJ0LmNvcHlGcm9tKHRoaXMuY29sb3JTdGFydCk7XG5cdHBhcnRpY2xlLmNvbG9yU3RhcnQuciArPSB0aGlzLnZhcmlhbmNlRnJvbSh0aGlzLmNvbG9yU3RhcnRWYXJpYW5jZS5yKTtcblx0cGFydGljbGUuY29sb3JTdGFydC5nICs9IHRoaXMudmFyaWFuY2VGcm9tKHRoaXMuY29sb3JTdGFydFZhcmlhbmNlLmcpO1xuXHRwYXJ0aWNsZS5jb2xvclN0YXJ0LmIgKz0gdGhpcy52YXJpYW5jZUZyb20odGhpcy5jb2xvclN0YXJ0VmFyaWFuY2UuYik7XG5cdHBhcnRpY2xlLmNvbG9yU3RhcnQuYWxwaGEgKz0gdGhpcy52YXJpYW5jZUZyb20odGhpcy5jb2xvclN0YXJ0VmFyaWFuY2UuYWxwaGEpO1xuXG5cdHBhcnRpY2xlLmNvbG9yRW5kLmNvcHlGcm9tKHRoaXMuY29sb3JFbmQpO1xuXHRwYXJ0aWNsZS5jb2xvckVuZC5yICs9IHRoaXMudmFyaWFuY2VGcm9tKHRoaXMuY29sb3JFbmRWYXJpYW5jZS5yKTtcblx0cGFydGljbGUuY29sb3JFbmQuZyArPSB0aGlzLnZhcmlhbmNlRnJvbSh0aGlzLmNvbG9yRW5kVmFyaWFuY2UuZyk7XG5cdHBhcnRpY2xlLmNvbG9yRW5kLmIgKz0gdGhpcy52YXJpYW5jZUZyb20odGhpcy5jb2xvckVuZFZhcmlhbmNlLmIpO1xuXHRwYXJ0aWNsZS5jb2xvckVuZC5hbHBoYSArPSB0aGlzLnZhcmlhbmNlRnJvbSh0aGlzLmNvbG9yRW5kVmFyaWFuY2UuYWxwaGEpO1xuXG5cdHBhcnRpY2xlLmNvbG9yLmNvcHlGcm9tKHBhcnRpY2xlLmNvbG9yU3RhcnQpO1xufTtcblxuQ29sb3JCZWhhdmlvdXIucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24ocGFydGljbGUsIGRlbHRhVGltZSkge1xuXHRwYXJ0aWNsZS5jb2xvci5jb3B5RnJvbShwYXJ0aWNsZS5jb2xvclN0YXJ0KTtcblxuXHRwYXJ0aWNsZS5jb2xvci5yICs9IChwYXJ0aWNsZS5jb2xvckVuZC5yIC0gcGFydGljbGUuY29sb3JTdGFydC5yKSAqIHBhcnRpY2xlLmxpZmVQcm9ncmVzcztcblx0cGFydGljbGUuY29sb3IuZyArPSAocGFydGljbGUuY29sb3JFbmQuZyAtIHBhcnRpY2xlLmNvbG9yU3RhcnQuZykgKiBwYXJ0aWNsZS5saWZlUHJvZ3Jlc3M7XG5cdHBhcnRpY2xlLmNvbG9yLmIgKz0gKHBhcnRpY2xlLmNvbG9yRW5kLmIgLSBwYXJ0aWNsZS5jb2xvclN0YXJ0LmIpICogcGFydGljbGUubGlmZVByb2dyZXNzO1xuXHRwYXJ0aWNsZS5jb2xvci5hbHBoYSArPSAocGFydGljbGUuY29sb3JFbmQuYWxwaGEgLSBwYXJ0aWNsZS5jb2xvclN0YXJ0LmFscGhhKSAqIHBhcnRpY2xlLmxpZmVQcm9ncmVzcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sb3JCZWhhdmlvdXI7XG5cbiIsIlxuZnVuY3Rpb24gRW1pdHRlckJlaGF2aW91cnMoKSB7XG5cdHRoaXMuYmVoYXZpb3VycyA9IFtdO1xufVxuXG5FbWl0dGVyQmVoYXZpb3Vycy5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLmJlaGF2aW91cnM7XG59O1xuXG5FbWl0dGVyQmVoYXZpb3Vycy5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oYmVoYXZpb3VyKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5iZWhhdmlvdXJzLmxlbmd0aDsgKytpKSB7XG5cdFx0aWYodGhpcy5iZWhhdmlvdXJzW2ldID09PSBiZWhhdmlvdXIpe1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiRW1pdHRlciBkdXBsaWNhdGVcIik7XG5cdFx0fVxuXHR9XG5cdHRoaXMuYmVoYXZpb3Vycy5wdXNoKGJlaGF2aW91cik7XG5cblx0dGhpcy5iZWhhdmlvdXJzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuXHRcdHJldHVybiBhLnByaW9yaXR5IC0gYi5wcmlvcml0eTtcblx0fSk7XG5cbn07XG5cbkVtaXR0ZXJCZWhhdmlvdXJzLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24ocGFydGljbGUpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmJlaGF2aW91cnMubGVuZ3RoOyArK2kpIHtcblx0XHR0aGlzLmJlaGF2aW91cnNbaV0uaW5pdChwYXJ0aWNsZSk7XG5cdH1cbn07XG5cbkVtaXR0ZXJCZWhhdmlvdXJzLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uKHBhcnRpY2xlLCBkZWx0YVRpbWUpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmJlaGF2aW91cnMubGVuZ3RoOyArK2kpIHtcblx0XHR0aGlzLmJlaGF2aW91cnNbaV0uYXBwbHkocGFydGljbGUsIGRlbHRhVGltZSk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRW1pdHRlckJlaGF2aW91cnM7IiwidmFyIEJlaGF2aW91ciA9IHJlcXVpcmUoXCJtb2RlbC9CZWhhdmlvdXJcIik7XG5cbkxpZmVCZWhhdmlvdXIuREVGQVVMVF9QUklPUklUWSA9IDEwMDAwO1xuXG5mdW5jdGlvbiBMaWZlQmVoYXZpb3VyKCkge1xuXHRCZWhhdmlvdXIuY2FsbCh0aGlzKTtcblxuXHR0aGlzLnByaW9yaXR5ID0gTGlmZUJlaGF2aW91ci5ERUZBVUxUX1BSSU9SSVRZO1xuXHR0aGlzLm1heExpZmVUaW1lID0gMDtcblx0dGhpcy50aW1lVmFyaWFuY2UgPSAwO1xufVxuXG5cbkxpZmVCZWhhdmlvdXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCZWhhdmlvdXIucHJvdG90eXBlKTtcbkxpZmVCZWhhdmlvdXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTGlmZUJlaGF2aW91cjtcblxuTGlmZUJlaGF2aW91ci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKHBhcnRpY2xlKSB7XG5cdHBhcnRpY2xlLmxpZmVUaW1lID0gMDtcblx0cGFydGljbGUubGlmZVByb2dyZXNzID0gMDtcblxuXHRwYXJ0aWNsZS5tYXhMaWZlVGltZSA9IHRoaXMubWF4TGlmZVRpbWUgKyB0aGlzLnZhcmlhbmNlRnJvbSh0aGlzLnRpbWVWYXJpYW5jZSk7XG5cdHBhcnRpY2xlLm1heExpZmVUaW1lID0gTWF0aC5tYXgocGFydGljbGUubWF4TGlmZVRpbWUsIDAuMCk7XG59O1xuXG5MaWZlQmVoYXZpb3VyLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uKHBhcnRpY2xlLCBkZWx0YVRpbWUpIHtcblx0cGFydGljbGUubGlmZVRpbWUgKz0gZGVsdGFUaW1lO1xuXG5cdGlmIChwYXJ0aWNsZS5tYXhMaWZlVGltZSA+IDApIHtcblx0XHRwYXJ0aWNsZS5saWZlUHJvZ3Jlc3MgPSBwYXJ0aWNsZS5saWZlVGltZSAvIHBhcnRpY2xlLm1heExpZmVUaW1lO1xuXHR9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTGlmZUJlaGF2aW91cjsiLCJ2YXIgQmVoYXZpb3VyID0gcmVxdWlyZShcIm1vZGVsL0JlaGF2aW91clwiKTtcbnZhciBQb2ludCA9IHJlcXVpcmUoXCJ1dGlsL1BvaW50XCIpO1xuXG5Qb3NpdGlvbkJlaGF2aW91ci5ERUZBVUxUX1BSSU9SSVRZID0gMTAwO1xuXG5mdW5jdGlvbiBQb3NpdGlvbkJlaGF2aW91cigpIHtcblx0QmVoYXZpb3VyLmNhbGwodGhpcyk7XG5cblx0dGhpcy5wcmlvcml0eSA9IFBvc2l0aW9uQmVoYXZpb3VyLkRFRkFVTFRfUFJJT1JJVFk7XG5cblx0dGhpcy5wb3NpdGlvbiA9IG5ldyBQb2ludCgpO1xuXHR0aGlzLnBvc2l0aW9uVmFyaWFuY2UgPSBuZXcgUG9pbnQoKTtcblx0dGhpcy52ZWxvY2l0eSA9IG5ldyBQb2ludCgpO1xuXHR0aGlzLnZlbG9jaXR5VmFyaWFuY2UgPSBuZXcgUG9pbnQoKTtcblx0dGhpcy5hY2NlbGVyYXRpb24gPSBuZXcgUG9pbnQoKTtcblx0dGhpcy5hY2NlbGVyYXRpb25WYXJpYW5jZSA9IG5ldyBQb2ludCgpO1xufVxuXG5Qb3NpdGlvbkJlaGF2aW91ci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJlaGF2aW91ci5wcm90b3R5cGUpO1xuUG9zaXRpb25CZWhhdmlvdXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUG9zaXRpb25CZWhhdmlvdXI7XG5cblBvc2l0aW9uQmVoYXZpb3VyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24ocGFydGljbGUpIHtcblx0cGFydGljbGUucG9zaXRpb24ueCA9IHRoaXMuY2FsY3VsYXRlKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvblZhcmlhbmNlLngpO1xuXHRwYXJ0aWNsZS5wb3NpdGlvbi55ID0gdGhpcy5jYWxjdWxhdGUodGhpcy5wb3NpdGlvbi55LCB0aGlzLnBvc2l0aW9uVmFyaWFuY2UueSk7XG5cblx0cGFydGljbGUudmVsb2NpdHkueCA9IHRoaXMuY2FsY3VsYXRlKHRoaXMudmVsb2NpdHkueCwgdGhpcy52ZWxvY2l0eVZhcmlhbmNlLngpO1xuXHRwYXJ0aWNsZS52ZWxvY2l0eS55ID0gdGhpcy5jYWxjdWxhdGUodGhpcy52ZWxvY2l0eS55LCB0aGlzLnZlbG9jaXR5VmFyaWFuY2UueSk7XG5cblx0cGFydGljbGUuYWNjZWxlcmF0aW9uLnggPSB0aGlzLmNhbGN1bGF0ZSh0aGlzLmFjY2VsZXJhdGlvbi54LCB0aGlzLmFjY2VsZXJhdGlvblZhcmlhbmNlLngpO1xuXHRwYXJ0aWNsZS5hY2NlbGVyYXRpb24ueSA9IHRoaXMuY2FsY3VsYXRlKHRoaXMuYWNjZWxlcmF0aW9uLnksIHRoaXMuYWNjZWxlcmF0aW9uVmFyaWFuY2UueSk7XG59O1xuXG5Qb3NpdGlvbkJlaGF2aW91ci5wcm90b3R5cGUuY2FsY3VsYXRlID0gZnVuY3Rpb24odmFsdWUsIHZhcmlhbmNlKSB7XG5cdHJldHVybiB2YWx1ZSArIHRoaXMudmFyaWFuY2VGcm9tKHZhcmlhbmNlKTtcbn07XG5cblBvc2l0aW9uQmVoYXZpb3VyLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uKHBhcnRpY2xlLCBkZWx0YVRpbWUpIHtcblx0cGFydGljbGUudmVsb2NpdHkueCArPSAocGFydGljbGUuYWNjZWxlcmF0aW9uLnggKiBkZWx0YVRpbWUpO1xuXHRwYXJ0aWNsZS52ZWxvY2l0eS55ICs9IChwYXJ0aWNsZS5hY2NlbGVyYXRpb24ueSAqIGRlbHRhVGltZSk7XG5cblx0cGFydGljbGUucG9zaXRpb24ueCArPSAocGFydGljbGUudmVsb2NpdHkueCAqIGRlbHRhVGltZSk7XG5cdHBhcnRpY2xlLnBvc2l0aW9uLnkgKz0gKHBhcnRpY2xlLnZlbG9jaXR5LnkgKiBkZWx0YVRpbWUpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb3NpdGlvbkJlaGF2aW91cjsiLCJ2YXIgQmVoYXZpb3VyID0gcmVxdWlyZShcIm1vZGVsL0JlaGF2aW91clwiKTtcbnZhciBQb2ludCA9IHJlcXVpcmUoXCJ1dGlsL1BvaW50XCIpO1xuXG5TaXplQmVoYXZpb3VyLkRFRkFVTFRfUFJJT1JJVFkgPSAwO1xuXG5mdW5jdGlvbiBTaXplQmVoYXZpb3VyKCkge1xuXHRCZWhhdmlvdXIuY2FsbCh0aGlzKTtcblxuXHR0aGlzLnByaW9yaXR5ID0gU2l6ZUJlaGF2aW91ci5ERUZBVUxUX1BSSU9SSVRZO1xuXG5cdHRoaXMuYWxsb3dOZWdhdGl2ZVZhbHVlcyA9IGZhbHNlO1xuXG5cdHRoaXMuc2l6ZVN0YXJ0ID0gbmV3IFBvaW50KCk7XG5cdHRoaXMuc2l6ZUVuZCA9IG5ldyBQb2ludCgpO1xuXHR0aGlzLnN0YXJ0VmFyaWFuY2UgPSAwO1xuXHR0aGlzLmVuZFZhcmlhbmNlID0gMDtcbn1cblxuU2l6ZUJlaGF2aW91ci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJlaGF2aW91ci5wcm90b3R5cGUpO1xuU2l6ZUJlaGF2aW91ci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTaXplQmVoYXZpb3VyO1xuXG5TaXplQmVoYXZpb3VyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24ocGFydGljbGUpIHtcblx0Ly90b2RvIG9wdGltYWxpemF0aW9uPz9cblxuXHR2YXIgdmFyaWFuY2UgPSB0aGlzLnZhcmlhbmNlRnJvbSh0aGlzLnN0YXJ0VmFyaWFuY2UpO1xuXHRwYXJ0aWNsZS5zaXplU3RhcnQueCA9IHRoaXMuc2l6ZVN0YXJ0LnggKyB2YXJpYW5jZTtcblx0cGFydGljbGUuc2l6ZVN0YXJ0LnkgPSB0aGlzLnNpemVTdGFydC55ICsgdmFyaWFuY2U7XG5cblx0dmFyaWFuY2UgPSB0aGlzLnZhcmlhbmNlRnJvbSh0aGlzLmVuZFZhcmlhbmNlKTtcblx0cGFydGljbGUuc2l6ZUVuZC54ID0gdGhpcy5zaXplRW5kLnggKyB2YXJpYW5jZTtcblx0cGFydGljbGUuc2l6ZUVuZC55ID0gdGhpcy5zaXplRW5kLnkgKyB2YXJpYW5jZTtcblxuXHRpZiAoIXRoaXMuYWxsb3dOZWdhdGl2ZVZhbHVlcykge1xuXHRcdHBhcnRpY2xlLnNpemVTdGFydC54ID0gTWF0aC5tYXgocGFydGljbGUuc2l6ZVN0YXJ0LngsIDApO1xuXHRcdHBhcnRpY2xlLnNpemVTdGFydC55ID0gTWF0aC5tYXgocGFydGljbGUuc2l6ZVN0YXJ0LnksIDApO1xuXHRcdHBhcnRpY2xlLnNpemVFbmQueCA9IE1hdGgubWF4KHBhcnRpY2xlLnNpemVFbmQueCwgMCk7XG5cdFx0cGFydGljbGUuc2l6ZUVuZC55ID0gTWF0aC5tYXgocGFydGljbGUuc2l6ZUVuZC55LCAwKTtcblx0fVxuXG5cdHBhcnRpY2xlLnNpemUuY29weUZyb20ocGFydGljbGUuc2l6ZVN0YXJ0KTtcbn07XG5cblNpemVCZWhhdmlvdXIucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24ocGFydGljbGUsIGRlbHRhVGltZSkge1xuXHRwYXJ0aWNsZS5zaXplLmNvcHlGcm9tKHBhcnRpY2xlLnNpemVTdGFydCk7XG5cdHBhcnRpY2xlLnNpemUueCArPSAocGFydGljbGUuc2l6ZUVuZC54IC0gcGFydGljbGUuc2l6ZVN0YXJ0LngpICogcGFydGljbGUubGlmZVByb2dyZXNzO1xuXHRwYXJ0aWNsZS5zaXplLnkgKz0gKHBhcnRpY2xlLnNpemVFbmQueSAtIHBhcnRpY2xlLnNpemVTdGFydC55KSAqIHBhcnRpY2xlLmxpZmVQcm9ncmVzcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2l6ZUJlaGF2aW91cjsiLCJ2YXIgTWF0aFV0aWwgPSByZXF1aXJlKFwidXRpbC9NYXRoVXRpbFwiKTtcblxuZnVuY3Rpb24gQ29sb3IociwgZywgYiwgYWxwaGEpIHtcblx0dGhpcy5yID0gciB8fCAwO1xuXHR0aGlzLmcgPSBnIHx8IDA7XG5cdHRoaXMuYiA9IGIgfHwgMDtcblx0dGhpcy5hbHBoYSA9IGFscGhhIHx8IDA7XG59XG5cbkNvbG9yLnByb3RvdHlwZS5jb3B5RnJvbSA9IGZ1bmN0aW9uKGNvbG9yKSB7XG5cdHRoaXMuciA9IGNvbG9yLnI7XG5cdHRoaXMuZyA9IGNvbG9yLmc7XG5cdHRoaXMuYiA9IGNvbG9yLmI7XG5cdHRoaXMuYWxwaGEgPSBjb2xvci5hbHBoYTtcbn07XG5cbkNvbG9yLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihjb2xvcikge1xuXHR0aGlzLnIgKz0gY29sb3Iucjtcblx0dGhpcy5nICs9IGNvbG9yLmc7XG5cdHRoaXMuYiArPSBjb2xvci5iO1xuXHR0aGlzLmFscGhhICs9IGNvbG9yLmFscGhhO1xufTtcblxuQ29sb3IucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKHIsZyxiLGEpIHtcblx0dGhpcy5yID0gciB8fCAwO1xuXHR0aGlzLmcgPSBnIHx8IDA7XG5cdHRoaXMuYiA9IGIgfHwgMDtcblx0dGhpcy5hbHBoYSA9IGEgfHwgMDtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsIFwiaGV4XCIsIHtcblx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgaGV4ID0gdGhpcy5yIDw8IDE2O1xuXHRcdGhleCA9IGhleCB8IHRoaXMuZyA8PCA4O1xuXHRcdGhleCA9IGhleCB8IHRoaXMuYjtcblx0XHRyZXR1cm4gaGV4O1xuXHR9LFxuXHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0dGhpcy5yID0gKHZhbHVlICYgMHhGRjAwMDApID4+IDE2O1xuXHRcdHRoaXMuZyA9ICh2YWx1ZSAmIDB4RkYwMCkgPj4gODtcblx0XHR0aGlzLmIgPSAodmFsdWUgJiAweEZGKTtcblx0fVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsIFwiclwiLCB7XG5cdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3I7XG5cdH0sXG5cdHNldDogZnVuY3Rpb24odmFsdWUpIHtcblx0XHR0aGlzLl9yID0gTWF0aFV0aWwuY2xhbXAodmFsdWUsIDAsIDI1NSk7XG5cdH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCBcImdcIiwge1xuXHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLl9nO1xuXHR9LFxuXHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0dGhpcy5fZyA9IE1hdGhVdGlsLmNsYW1wKHZhbHVlLCAwLCAyNTUpO1xuXHR9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgXCJiXCIsIHtcblx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5fYjtcblx0fSxcblx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdHRoaXMuX2IgPSBNYXRoVXRpbC5jbGFtcCh2YWx1ZSwgMCwgMjU1KTtcblx0fVxufSk7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgXCJhbHBoYVwiLCB7XG5cdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2FscGhhO1xuXHR9LFxuXHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0dGhpcy5fYWxwaGEgPSBNYXRoVXRpbC5jbGFtcCh2YWx1ZSwgMCwgMSk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbG9yOyIsImZ1bmN0aW9uIExpc3QoKSB7XG5cdHRoaXMuZmlyc3QgPSBudWxsO1xuXHR0aGlzLmxlbmd0aCA9IDA7XG59XG5cbkxpc3QucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuZmlyc3QgPT09IG51bGw7XG59O1xuXG5MaXN0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihpdGVtKSB7XG5cdGl0ZW0ucHJldiA9IG51bGw7XG5cdGl0ZW0ubmV4dCA9IG51bGw7XG5cdGlmICh0aGlzLmZpcnN0KSB7XG5cdFx0dGhpcy5maXJzdC5wcmV2ID0gaXRlbTtcblx0fVxuXG5cdGl0ZW0ubmV4dCA9IHRoaXMuZmlyc3Q7XG5cdHRoaXMuZmlyc3QgPSBpdGVtO1xuXHR0aGlzLmxlbmd0aCsrO1xuXHRyZXR1cm4gaXRlbTtcbn07XG5cbkxpc3QucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXHR2YXIgY3VycmVudCA9IHRoaXMuZmlyc3Q7XG5cdHZhciBuZXh0ID0gbnVsbDtcblx0d2hpbGUgKGN1cnJlbnQpIHtcblx0XHRuZXh0ID0gY3VycmVudC5uZXh0O1xuXHRcdGNhbGxiYWNrKGN1cnJlbnQpO1xuXHRcdGN1cnJlbnQgPSBuZXh0O1xuXHR9XG59O1xuXG5MaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihpdGVtKSB7XG5cdHZhciBwcmV2aW91cyA9IGl0ZW0ucHJldjtcblx0dmFyIG5leHQgPSBpdGVtLm5leHQ7XG5cblx0aWYgKHByZXZpb3VzKVxuXHRcdHByZXZpb3VzLm5leHQgPSBuZXh0O1xuXG5cdGlmIChuZXh0KVxuXHRcdG5leHQucHJldiA9IHByZXZpb3VzO1xuXG5cdGlmICh0aGlzLmZpcnN0ID09PSBpdGVtKVxuXHRcdHRoaXMuZmlyc3QgPSBpdGVtLm5leHQ7XG5cblx0aXRlbS5wcmV2ID0gbnVsbDtcblx0aXRlbS5uZXh0ID0gbnVsbDtcblx0dGhpcy5sZW5ndGgtLTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTGlzdDtcbiIsImZ1bmN0aW9uIE1hdGhVdGlsKCkge1xufVxuXG5NYXRoVXRpbC5FUFNJTE9OID0gMi4yMjA0NDYwNDkyNTAzMTNlLTE2O1xuXG5NYXRoVXRpbC5jbGFtcCA9IGZ1bmN0aW9uKHZhbHVlLCBtaW4sIG1heCkge1xuXHRyZXR1cm4gTWF0aC5tYXgobWluLCBNYXRoLm1pbih2YWx1ZSwgbWF4KSk7XG59O1xuXG5NYXRoVXRpbC5hcmVFcXVhbCA9IGZ1bmN0aW9uKGEsIGIpIHtcblx0cmV0dXJuIE1hdGguYWJzKGEgLSBiKSA8IE1hdGhVdGlsLkVQU0lMT047XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGhVdGlsOyIsInZhciBQYXJ0aWNsZSA9IHJlcXVpcmUoXCJtb2RlbC9QYXJ0aWNsZVwiKTtcblxuUGFydGljbGVQb29sLmdsb2JhbCA9IG5ldyBQYXJ0aWNsZVBvb2woKTtcblxuZnVuY3Rpb24gUGFydGljbGVQb29sKCkge1xuXHR0aGlzLmZpcnN0ID0gbnVsbDtcbn1cblxuUGFydGljbGVQb29sLnByb3RvdHlwZS5wb3AgPSBmdW5jdGlvbigpIHtcblx0aWYgKCF0aGlzLmZpcnN0KVxuXHRcdHJldHVybiB0aGlzLmNyZWF0ZSgpO1xuXG5cdHZhciBjdXJyZW50ID0gdGhpcy5maXJzdDtcblx0dGhpcy5maXJzdCA9IGN1cnJlbnQubmV4dDtcblx0Y3VycmVudC5uZXh0ID0gbnVsbDtcblx0cmV0dXJuIGN1cnJlbnQ7XG59O1xuXG5QYXJ0aWNsZVBvb2wucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gbmV3IFBhcnRpY2xlKCk7XG59O1xuXG5QYXJ0aWNsZVBvb2wucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbihwYXJ0aWNsZSkge1xuXHRwYXJ0aWNsZS5uZXh0ID0gdGhpcy5maXJzdDtcblx0dGhpcy5maXJzdCA9IHBhcnRpY2xlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXJ0aWNsZVBvb2w7IiwiXG5mdW5jdGlvbiBQb2ludCh4LCB5KSB7XG5cdHRoaXMueCA9IHggfHwgMDtcblx0dGhpcy55ID0geSB8fCAwO1xufVxuXG5Qb2ludC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24oeCwgeSkge1xuXHR0aGlzLnggPSB4O1xuXHR0aGlzLnkgPSB5ID09PSB1bmRlZmluZWQgPyB0aGlzLnkgOiB5O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cblBvaW50LnByb3RvdHlwZS5jb3B5RnJvbSA9IGZ1bmN0aW9uKHBvaW50KSB7XG5cdHRoaXMueCA9IHBvaW50Lng7XG5cdHRoaXMueSA9IHBvaW50Lnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuUG9pbnQucHJvdG90eXBlLm11bHRpcGxheUJ5U2NhbGFyID0gZnVuY3Rpb24oc2NhbGFyKSB7XG5cdHRoaXMueCAqPSBzY2FsYXI7XG5cdHRoaXMueSAqPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKHBvaW50KSB7XG5cdHRoaXMueCArPSBwb2ludC54O1xuXHR0aGlzLnkgKz0gcG9pbnQueTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvaW50OyIsInZhciBNZXJzZW5uZVR3aXN0ZXIgPSByZXF1aXJlKFwiTWVyc2VubmVUd2lzdGVyXCIpO1xuXG5SYW5kb20ubWFyc2VubmVUd2lzdGVyID0gbmV3IE1lcnNlbm5lVHdpc3RlcigpO1xuZnVuY3Rpb24gUmFuZG9tKCkge1xufVxuXG5SYW5kb20uZ2V0ID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiBSYW5kb20udW5pZm9ybSgwLjAsIDEuMCk7XG59O1xuXG5SYW5kb20udW5pZm9ybSA9IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG5cdHJldHVybiBSYW5kb20ubWFyc2VubmVUd2lzdGVyLmdlbnJhbmRfcmVhbDEoKSAqIChtYXggLSBtaW4pICsgbWluOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmFuZG9tO1xuIl19
