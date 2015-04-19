(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
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

},{"util/Color":3,"util/Point":7}],3:[function(require,module,exports){
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
},{"util/MathUtil":5}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
var Particle = require("Particle");

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
},{"Particle":2}],7:[function(require,module,exports){

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
},{}],8:[function(require,module,exports){
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

},{"MersenneTwister":1}]},{},[2,3,4,5,6,7,8])


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"MersenneTwister":2,"Particle":3,"util/Color":4,"util/MathUtil":6,"util/Point":8}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"util/Color":4,"util/Point":8}],4:[function(require,module,exports){
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
},{"util/MathUtil":6}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
var Particle = require("Particle");

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
},{"Particle":3}],8:[function(require,module,exports){

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
},{}],9:[function(require,module,exports){
var Particle = require("Particle");

describe("ParticleTest", function() {

	it("UID generation", function() {
		assert.equal(new Particle().uid, Particle._UID.value - 1);
		assert.equal(new Particle().uid, Particle._UID.value - 1);
		assert.equal(new Particle().uid, Particle._UID.value - 1);
	});

	it("UID is unique", function() {
		uids = {};
		for(var i = 0; i < 1000; ++i){
			var particle = new Particle();

			assert.ok(!uids[particle.uid]);
			uids[particle.uid] = true;
		}
	});

	it("isDead", function() {
		var dead = new Particle();
		dead.life = 0;
		var alive = new Particle();
		alive.currentLifeTime = 55;
		alive.maxLifeTime = 9999;

		assert.ok(dead.isDead());
		assert.ok(!alive.isDead());
	});
});

},{"Particle":3}],10:[function(require,module,exports){
var Color = require("util/Color");

describe("ColorTest", function() {

	var isEqual = function(source, target) {
		return source.r === target.r && source.g === target.g && source.b === target.b;
	};

	it("constuctor - default", function() {
		var color = new Color();

		assert.equal(color.r, 0);
		assert.equal(color.g, 0);
		assert.equal(color.b, 0);
	});

	it("constuctor - custom r", function() {
		var color = new Color(10);

		assert.equal(color.r, 10);
		assert.equal(color.g, 0);
		assert.equal(color.b, 0);
	});

	it("constuctor - custom rg", function() {
		var color = new Color(10, 20);

		assert.equal(color.r, 10);
		assert.equal(color.g, 20);
		assert.equal(color.b, 0);
	});

	it("constuctor - custom rgb", function() {
		var color = new Color(10, 20, 30);

		assert.equal(color.r, 10);
		assert.equal(color.g, 20);
		assert.equal(color.b, 30);
	});

	it("copyFrom", function() {
		var color = new Color();
		color.copyFrom(new Color(1, 2));

		assert.equal(color.r, 1);
		assert.equal(color.g, 2);
		assert.equal(color.b, 0);
	});

	it("add", function() {
		var color = new Color(5, 5, 5);
		color.add(new Color(1, 2));

		assert.equal(color.r, 6);
		assert.equal(color.g, 7);
		assert.equal(color.b, 5);
	});

	it("hex - from rgb", function() {
		assert.equal(new Color(153, 50, 204).hex, 0x9932CC);
		assert.equal(new Color(123, 104, 238).hex, 0x7B68EE);
		assert.equal(new Color(250, 250, 210).hex, 0xFAFAD2);
	});

	it("hex - to rgb", function() {
		var color = new Color();

		color.hex = 0x9932CC;
		assert.ok(isEqual(color, new Color(153, 50, 204)));

		color.hex = 0x7B68EE;
		assert.ok(isEqual(color, new Color(123, 104, 238)));

		color.hex = 0xFAFAD2;
		assert.ok(isEqual(color, new Color(250, 250, 210)));
	});

	it("overflow protection", function() {
		var color = new Color(500, 200);
		color.g += 200;

		assert.equal(color.r, 255);
		assert.equal(color.g, 255);
		assert.equal(color.b, 0);
	});

	it("uderflow protection", function() {
		var color = new Color(-100, 50);
		color.g -= 200;

		assert.equal(color.r, 0);
		assert.equal(color.g, 0);
		assert.equal(color.b, 0);
	});

});

},{"util/Color":4}],11:[function(require,module,exports){
var List = require("util/List");

describe("ListTest", function() {

	function Mock(number) {
		this.number = number;
		this.next = null;
		this.prev = null;
	}

	var list = null;

	beforeEach(function() {
		list = new List();
	});

	it("should be empty", function() {
		assert.ok(list.isEmpty());
	});

	it("should be empty after remove all elements", function() {
		var item = list.add(new Mock());
		var item2 = list.add(new Mock());

		list.remove(item);
		list.remove(item2);

		assert.ok(list.isEmpty());
	});

	it("should NOT be empty", function() {
		list.add(new Mock());
		assert.ok(!list.isEmpty());
	});

	it("iterate over list", function() {
		var last = 4;
		for (var i = 0; i < last; ++i) {
			list.add(new Mock(i));
		}

		list.forEach(function(item) {
			assert.equal(item.number, --last);
		});
	});

	it("remove item in loop", function() {
		var last = 10;
		for (var i = 0; i < last; ++i) {
			list.add(new Mock(i));
		}

		var toRemove = [2, 5, 7, 8];

		list.forEach(function(item) {
			if (toRemove.indexOf(item.number) >= 0)
				list.remove(item);

			assert.equal(item.number, --last);
		});
	});

	it("should have correct length after add", function() {
		for (var i = 0; i < 10; ++i) {
			list.add(new Mock(i));
		}

		assert.equal(list.length, 10);
	});

	it("should have correct length after add and remove", function() {
		for (var i = 0; i < 10; ++i) {
			list.add(new Mock(i));
		}

		list.forEach(function(item) {
			if (item.number < 5) {
				list.remove(item);
			}
		});

		for (i = 0; i < 10; ++i) {
			list.add(new Mock(i));
		}

		assert.equal(list.length, 15);
	});
});

},{"util/List":5}],12:[function(require,module,exports){
var MathUtil = require("util/MathUtil");

describe("MathUtil", function() {

	it("clamp - no change", function() {
		assert.equal(MathUtil.clamp(0, -10, 10), 0);
	});

	it("clamp - to min", function() {
		assert.equal(MathUtil.clamp(-100, -10, 10), -10);
	});

	it("clamp - to max", function() {
		assert.equal(MathUtil.clamp(99, -10, 10), 10);
	});
});

},{"util/MathUtil":6}],13:[function(require,module,exports){
var ParticlePool = require("util/ParticlePool");

describe("ParticlePoolTest", function() {

	var spy = null;
	var pool = null;

	beforeEach(function() {
		pool = new ParticlePool();
		spy = sinon.spy(pool, "create");
	});

	afterEach(function() {
		spy.restore();
	});

	it("should create one instance of Particle", function() {
		pool.pop();
		assert.ok(spy.calledOnce);
	});

	it("should create two instances of Particle", function() {
		pool.pop();
		pool.pop();
		assert.ok(spy.calledTwice);
	});

	it("should have one instance of Particle after pop/push/pop", function() {
		var particle = pool.pop();
		pool.push(particle);
		pool.pop();
		assert.ok(spy.calledOnce);
	});

	it("should have two instance of Particle after sequence of pop/push", function() {

		var particle1, particle2;
		for (var i = 0; i < 10; i++) {
			particle1 = pool.pop();
			particle2 = pool.pop();

			pool.push(particle1);
			pool.push(particle2);
		}
		assert.ok(spy.calledTwice);
	});

	it("should return the same instance of particle", function() {
		var particle = pool.pop();
		var previous = particle;
		pool.push(particle);

		for (var i = 0; i < 10; i++) {
			particle = pool.pop();
			assert.deepEqual(previous, particle);

			previous = particle;
			pool.push(particle);
		}
	});

});

},{"util/ParticlePool":7}],14:[function(require,module,exports){
var Point = require("util/Point");

describe("PointTest", function() {

	it("constuctor - default", function() {
		var point = new Point();

		assert.equal(point.x, 0);
		assert.equal(point.y, 0);
	});

	it("constuctor - custom params", function() {
		var point = new Point(10, 50);

		assert.equal(point.x, 10);
		assert.equal(point.y, 50);
	});

	it("set - only x value", function() {
		var point = new Point(10, 50);
		point.set(99);

		assert.equal(point.x, 99);
		assert.equal(point.y, 50);
	});

	it("set", function() {
		var point = new Point(22, 54);
		point.set(99, 0);

		assert.equal(point.x, 99);
		assert.equal(point.y, 0);
	});

	it("copyFrom", function() {
		var point = new Point(44, 42);
		point.copyFrom(new Point(1, 2));

		assert.equal(point.x, 1);
		assert.equal(point.y, 2);
	});

	it("multiplyByScalar", function() {
		var point = new Point(5, 10);
		point.multiplayByScalar(5);

		assert.equal(point.x, 25);
		assert.equal(point.y, 50);
	});

	it("add", function() {
		var point = new Point(5, 10);
		point.add(new Point(3, 3));

		assert.equal(point.x, 8);
		assert.equal(point.y, 13);
	});

});

},{"util/Point":8}]},{},[1,9,10,11,12,13,14])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvbWVyc2VubmUtdHdpc3Rlci5qcyIsInNyYy9QYXJ0aWNsZS5qcyIsInNyYy91dGlsL0NvbG9yLmpzIiwic3JjL3V0aWwvTGlzdC5qcyIsInNyYy91dGlsL01hdGhVdGlsLmpzIiwic3JjL3V0aWwvUGFydGljbGVQb29sLmpzIiwic3JjL3V0aWwvUG9pbnQuanMiLCJ0ZXN0L3NyYy9QYXJ0aWNsZVRlc3QuanMiLCJ0ZXN0L3NyYy91dGlsL0NvbG9yVGVzdC5qcyIsInRlc3Qvc3JjL3V0aWwvTGlzdFRlc3QuanMiLCJ0ZXN0L3NyYy91dGlsL01hdGhVdGlsVGVzdC5qcyIsInRlc3Qvc3JjL3V0aWwvUGFydGljbGVQb29sVGVzdC5qcyIsInRlc3Qvc3JjL3V0aWwvUG9pbnRUZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUFBOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUExTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQW5EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQWJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQTNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUE5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiOyB2YXIgX19icm93c2VyaWZ5X3NoaW1fcmVxdWlyZV9fPXJlcXVpcmU7KGZ1bmN0aW9uIGJyb3dzZXJpZnlTaGltKG1vZHVsZSwgZXhwb3J0cywgcmVxdWlyZSwgZGVmaW5lLCBicm93c2VyaWZ5X3NoaW1fX2RlZmluZV9fbW9kdWxlX19leHBvcnRfXykge1xuXG4vKlxuICBJJ3ZlIHdyYXBwZWQgTWFrb3RvIE1hdHN1bW90byBhbmQgVGFrdWppIE5pc2hpbXVyYSdzIGNvZGUgaW4gYSBuYW1lc3BhY2VcbiAgc28gaXQncyBiZXR0ZXIgZW5jYXBzdWxhdGVkLiBOb3cgeW91IGNhbiBoYXZlIG11bHRpcGxlIHJhbmRvbSBudW1iZXIgZ2VuZXJhdG9yc1xuICBhbmQgdGhleSB3b24ndCBzdG9tcCBhbGwgb3ZlciBlYWNob3RoZXIncyBzdGF0ZS5cbiAgXG4gIElmIHlvdSB3YW50IHRvIHVzZSB0aGlzIGFzIGEgc3Vic3RpdHV0ZSBmb3IgTWF0aC5yYW5kb20oKSwgdXNlIHRoZSByYW5kb20oKVxuICBtZXRob2QgbGlrZSBzbzpcbiAgXG4gIHZhciBtID0gbmV3IE1lcnNlbm5lVHdpc3RlcigpO1xuICB2YXIgcmFuZG9tTnVtYmVyID0gbS5yYW5kb20oKTtcbiAgXG4gIFlvdSBjYW4gYWxzbyBjYWxsIHRoZSBvdGhlciBnZW5yYW5kX3tmb299KCkgbWV0aG9kcyBvbiB0aGUgaW5zdGFuY2UuXG5cbiAgSWYgeW91IHdhbnQgdG8gdXNlIGEgc3BlY2lmaWMgc2VlZCBpbiBvcmRlciB0byBnZXQgYSByZXBlYXRhYmxlIHJhbmRvbVxuICBzZXF1ZW5jZSwgcGFzcyBhbiBpbnRlZ2VyIGludG8gdGhlIGNvbnN0cnVjdG9yOlxuXG4gIHZhciBtID0gbmV3IE1lcnNlbm5lVHdpc3RlcigxMjMpO1xuXG4gIGFuZCB0aGF0IHdpbGwgYWx3YXlzIHByb2R1Y2UgdGhlIHNhbWUgcmFuZG9tIHNlcXVlbmNlLlxuXG4gIFNlYW4gTWNDdWxsb3VnaCAoYmFua3NlYW5AZ21haWwuY29tKVxuKi9cblxuLyogXG4gICBBIEMtcHJvZ3JhbSBmb3IgTVQxOTkzNywgd2l0aCBpbml0aWFsaXphdGlvbiBpbXByb3ZlZCAyMDAyLzEvMjYuXG4gICBDb2RlZCBieSBUYWt1amkgTmlzaGltdXJhIGFuZCBNYWtvdG8gTWF0c3Vtb3RvLlxuIFxuICAgQmVmb3JlIHVzaW5nLCBpbml0aWFsaXplIHRoZSBzdGF0ZSBieSB1c2luZyBpbml0X2dlbnJhbmQoc2VlZCkgIFxuICAgb3IgaW5pdF9ieV9hcnJheShpbml0X2tleSwga2V5X2xlbmd0aCkuXG4gXG4gICBDb3B5cmlnaHQgKEMpIDE5OTcgLSAyMDAyLCBNYWtvdG8gTWF0c3Vtb3RvIGFuZCBUYWt1amkgTmlzaGltdXJhLFxuICAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuIFxuICAgUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gICBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnNcbiAgIGFyZSBtZXQ6XG4gXG4gICAgIDEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0XG4gICAgICAgIG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiBcbiAgICAgMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHRcbiAgICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZVxuICAgICAgICBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuIFxuICAgICAzLiBUaGUgbmFtZXMgb2YgaXRzIGNvbnRyaWJ1dG9ycyBtYXkgbm90IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIFxuICAgICAgICBwcm9kdWN0cyBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZSB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gXG4gICAgICAgIHBlcm1pc3Npb24uXG4gXG4gICBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTXG4gICBcIkFTIElTXCIgQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UXG4gICBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1JcbiAgIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUlxuICAgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsXG4gICBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sXG4gICBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1JcbiAgIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0ZcbiAgIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HXG4gICBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcbiAgIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuIFxuIFxuICAgQW55IGZlZWRiYWNrIGlzIHZlcnkgd2VsY29tZS5cbiAgIGh0dHA6Ly93d3cubWF0aC5zY2kuaGlyb3NoaW1hLXUuYWMuanAvfm0tbWF0L01UL2VtdC5odG1sXG4gICBlbWFpbDogbS1tYXQgQCBtYXRoLnNjaS5oaXJvc2hpbWEtdS5hYy5qcCAocmVtb3ZlIHNwYWNlKVxuKi9cblxudmFyIE1lcnNlbm5lVHdpc3RlciA9IGZ1bmN0aW9uKHNlZWQpIHtcbiAgaWYgKHNlZWQgPT0gdW5kZWZpbmVkKSB7XG4gICAgc2VlZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9IFxuICAvKiBQZXJpb2QgcGFyYW1ldGVycyAqLyAgXG4gIHRoaXMuTiA9IDYyNDtcbiAgdGhpcy5NID0gMzk3O1xuICB0aGlzLk1BVFJJWF9BID0gMHg5OTA4YjBkZjsgICAvKiBjb25zdGFudCB2ZWN0b3IgYSAqL1xuICB0aGlzLlVQUEVSX01BU0sgPSAweDgwMDAwMDAwOyAvKiBtb3N0IHNpZ25pZmljYW50IHctciBiaXRzICovXG4gIHRoaXMuTE9XRVJfTUFTSyA9IDB4N2ZmZmZmZmY7IC8qIGxlYXN0IHNpZ25pZmljYW50IHIgYml0cyAqL1xuIFxuICB0aGlzLm10ID0gbmV3IEFycmF5KHRoaXMuTik7IC8qIHRoZSBhcnJheSBmb3IgdGhlIHN0YXRlIHZlY3RvciAqL1xuICB0aGlzLm10aT10aGlzLk4rMTsgLyogbXRpPT1OKzEgbWVhbnMgbXRbTl0gaXMgbm90IGluaXRpYWxpemVkICovXG5cbiAgdGhpcy5pbml0X2dlbnJhbmQoc2VlZCk7XG59ICBcbiBcbi8qIGluaXRpYWxpemVzIG10W05dIHdpdGggYSBzZWVkICovXG5NZXJzZW5uZVR3aXN0ZXIucHJvdG90eXBlLmluaXRfZ2VucmFuZCA9IGZ1bmN0aW9uKHMpIHtcbiAgdGhpcy5tdFswXSA9IHMgPj4+IDA7XG4gIGZvciAodGhpcy5tdGk9MTsgdGhpcy5tdGk8dGhpcy5OOyB0aGlzLm10aSsrKSB7XG4gICAgICB2YXIgcyA9IHRoaXMubXRbdGhpcy5tdGktMV0gXiAodGhpcy5tdFt0aGlzLm10aS0xXSA+Pj4gMzApO1xuICAgdGhpcy5tdFt0aGlzLm10aV0gPSAoKCgoKHMgJiAweGZmZmYwMDAwKSA+Pj4gMTYpICogMTgxMjQzMzI1MykgPDwgMTYpICsgKHMgJiAweDAwMDBmZmZmKSAqIDE4MTI0MzMyNTMpXG4gICsgdGhpcy5tdGk7XG4gICAgICAvKiBTZWUgS251dGggVEFPQ1AgVm9sMi4gM3JkIEVkLiBQLjEwNiBmb3IgbXVsdGlwbGllci4gKi9cbiAgICAgIC8qIEluIHRoZSBwcmV2aW91cyB2ZXJzaW9ucywgTVNCcyBvZiB0aGUgc2VlZCBhZmZlY3QgICAqL1xuICAgICAgLyogb25seSBNU0JzIG9mIHRoZSBhcnJheSBtdFtdLiAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAvKiAyMDAyLzAxLzA5IG1vZGlmaWVkIGJ5IE1ha290byBNYXRzdW1vdG8gICAgICAgICAgICAgKi9cbiAgICAgIHRoaXMubXRbdGhpcy5tdGldID4+Pj0gMDtcbiAgICAgIC8qIGZvciA+MzIgYml0IG1hY2hpbmVzICovXG4gIH1cbn1cbiBcbi8qIGluaXRpYWxpemUgYnkgYW4gYXJyYXkgd2l0aCBhcnJheS1sZW5ndGggKi9cbi8qIGluaXRfa2V5IGlzIHRoZSBhcnJheSBmb3IgaW5pdGlhbGl6aW5nIGtleXMgKi9cbi8qIGtleV9sZW5ndGggaXMgaXRzIGxlbmd0aCAqL1xuLyogc2xpZ2h0IGNoYW5nZSBmb3IgQysrLCAyMDA0LzIvMjYgKi9cbk1lcnNlbm5lVHdpc3Rlci5wcm90b3R5cGUuaW5pdF9ieV9hcnJheSA9IGZ1bmN0aW9uKGluaXRfa2V5LCBrZXlfbGVuZ3RoKSB7XG4gIHZhciBpLCBqLCBrO1xuICB0aGlzLmluaXRfZ2VucmFuZCgxOTY1MDIxOCk7XG4gIGk9MTsgaj0wO1xuICBrID0gKHRoaXMuTj5rZXlfbGVuZ3RoID8gdGhpcy5OIDoga2V5X2xlbmd0aCk7XG4gIGZvciAoOyBrOyBrLS0pIHtcbiAgICB2YXIgcyA9IHRoaXMubXRbaS0xXSBeICh0aGlzLm10W2ktMV0gPj4+IDMwKVxuICAgIHRoaXMubXRbaV0gPSAodGhpcy5tdFtpXSBeICgoKCgocyAmIDB4ZmZmZjAwMDApID4+PiAxNikgKiAxNjY0NTI1KSA8PCAxNikgKyAoKHMgJiAweDAwMDBmZmZmKSAqIDE2NjQ1MjUpKSlcbiAgICAgICsgaW5pdF9rZXlbal0gKyBqOyAvKiBub24gbGluZWFyICovXG4gICAgdGhpcy5tdFtpXSA+Pj49IDA7IC8qIGZvciBXT1JEU0laRSA+IDMyIG1hY2hpbmVzICovXG4gICAgaSsrOyBqKys7XG4gICAgaWYgKGk+PXRoaXMuTikgeyB0aGlzLm10WzBdID0gdGhpcy5tdFt0aGlzLk4tMV07IGk9MTsgfVxuICAgIGlmIChqPj1rZXlfbGVuZ3RoKSBqPTA7XG4gIH1cbiAgZm9yIChrPXRoaXMuTi0xOyBrOyBrLS0pIHtcbiAgICB2YXIgcyA9IHRoaXMubXRbaS0xXSBeICh0aGlzLm10W2ktMV0gPj4+IDMwKTtcbiAgICB0aGlzLm10W2ldID0gKHRoaXMubXRbaV0gXiAoKCgoKHMgJiAweGZmZmYwMDAwKSA+Pj4gMTYpICogMTU2NjA4Mzk0MSkgPDwgMTYpICsgKHMgJiAweDAwMDBmZmZmKSAqIDE1NjYwODM5NDEpKVxuICAgICAgLSBpOyAvKiBub24gbGluZWFyICovXG4gICAgdGhpcy5tdFtpXSA+Pj49IDA7IC8qIGZvciBXT1JEU0laRSA+IDMyIG1hY2hpbmVzICovXG4gICAgaSsrO1xuICAgIGlmIChpPj10aGlzLk4pIHsgdGhpcy5tdFswXSA9IHRoaXMubXRbdGhpcy5OLTFdOyBpPTE7IH1cbiAgfVxuXG4gIHRoaXMubXRbMF0gPSAweDgwMDAwMDAwOyAvKiBNU0IgaXMgMTsgYXNzdXJpbmcgbm9uLXplcm8gaW5pdGlhbCBhcnJheSAqLyBcbn1cbiBcbi8qIGdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgb24gWzAsMHhmZmZmZmZmZl0taW50ZXJ2YWwgKi9cbk1lcnNlbm5lVHdpc3Rlci5wcm90b3R5cGUuZ2VucmFuZF9pbnQzMiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgeTtcbiAgdmFyIG1hZzAxID0gbmV3IEFycmF5KDB4MCwgdGhpcy5NQVRSSVhfQSk7XG4gIC8qIG1hZzAxW3hdID0geCAqIE1BVFJJWF9BICBmb3IgeD0wLDEgKi9cblxuICBpZiAodGhpcy5tdGkgPj0gdGhpcy5OKSB7IC8qIGdlbmVyYXRlIE4gd29yZHMgYXQgb25lIHRpbWUgKi9cbiAgICB2YXIga2s7XG5cbiAgICBpZiAodGhpcy5tdGkgPT0gdGhpcy5OKzEpICAgLyogaWYgaW5pdF9nZW5yYW5kKCkgaGFzIG5vdCBiZWVuIGNhbGxlZCwgKi9cbiAgICAgIHRoaXMuaW5pdF9nZW5yYW5kKDU0ODkpOyAvKiBhIGRlZmF1bHQgaW5pdGlhbCBzZWVkIGlzIHVzZWQgKi9cblxuICAgIGZvciAoa2s9MDtrazx0aGlzLk4tdGhpcy5NO2trKyspIHtcbiAgICAgIHkgPSAodGhpcy5tdFtra10mdGhpcy5VUFBFUl9NQVNLKXwodGhpcy5tdFtraysxXSZ0aGlzLkxPV0VSX01BU0spO1xuICAgICAgdGhpcy5tdFtra10gPSB0aGlzLm10W2trK3RoaXMuTV0gXiAoeSA+Pj4gMSkgXiBtYWcwMVt5ICYgMHgxXTtcbiAgICB9XG4gICAgZm9yICg7a2s8dGhpcy5OLTE7a2srKykge1xuICAgICAgeSA9ICh0aGlzLm10W2trXSZ0aGlzLlVQUEVSX01BU0spfCh0aGlzLm10W2trKzFdJnRoaXMuTE9XRVJfTUFTSyk7XG4gICAgICB0aGlzLm10W2trXSA9IHRoaXMubXRba2srKHRoaXMuTS10aGlzLk4pXSBeICh5ID4+PiAxKSBeIG1hZzAxW3kgJiAweDFdO1xuICAgIH1cbiAgICB5ID0gKHRoaXMubXRbdGhpcy5OLTFdJnRoaXMuVVBQRVJfTUFTSyl8KHRoaXMubXRbMF0mdGhpcy5MT1dFUl9NQVNLKTtcbiAgICB0aGlzLm10W3RoaXMuTi0xXSA9IHRoaXMubXRbdGhpcy5NLTFdIF4gKHkgPj4+IDEpIF4gbWFnMDFbeSAmIDB4MV07XG5cbiAgICB0aGlzLm10aSA9IDA7XG4gIH1cblxuICB5ID0gdGhpcy5tdFt0aGlzLm10aSsrXTtcblxuICAvKiBUZW1wZXJpbmcgKi9cbiAgeSBePSAoeSA+Pj4gMTEpO1xuICB5IF49ICh5IDw8IDcpICYgMHg5ZDJjNTY4MDtcbiAgeSBePSAoeSA8PCAxNSkgJiAweGVmYzYwMDAwO1xuICB5IF49ICh5ID4+PiAxOCk7XG5cbiAgcmV0dXJuIHkgPj4+IDA7XG59XG4gXG4vKiBnZW5lcmF0ZXMgYSByYW5kb20gbnVtYmVyIG9uIFswLDB4N2ZmZmZmZmZdLWludGVydmFsICovXG5NZXJzZW5uZVR3aXN0ZXIucHJvdG90eXBlLmdlbnJhbmRfaW50MzEgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICh0aGlzLmdlbnJhbmRfaW50MzIoKT4+PjEpO1xufVxuIFxuLyogZ2VuZXJhdGVzIGEgcmFuZG9tIG51bWJlciBvbiBbMCwxXS1yZWFsLWludGVydmFsICovXG5NZXJzZW5uZVR3aXN0ZXIucHJvdG90eXBlLmdlbnJhbmRfcmVhbDEgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZ2VucmFuZF9pbnQzMigpKigxLjAvNDI5NDk2NzI5NS4wKTsgXG4gIC8qIGRpdmlkZWQgYnkgMl4zMi0xICovIFxufVxuXG4vKiBnZW5lcmF0ZXMgYSByYW5kb20gbnVtYmVyIG9uIFswLDEpLXJlYWwtaW50ZXJ2YWwgKi9cbk1lcnNlbm5lVHdpc3Rlci5wcm90b3R5cGUucmFuZG9tID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmdlbnJhbmRfaW50MzIoKSooMS4wLzQyOTQ5NjcyOTYuMCk7IFxuICAvKiBkaXZpZGVkIGJ5IDJeMzIgKi9cbn1cbiBcbi8qIGdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgb24gKDAsMSktcmVhbC1pbnRlcnZhbCAqL1xuTWVyc2VubmVUd2lzdGVyLnByb3RvdHlwZS5nZW5yYW5kX3JlYWwzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAodGhpcy5nZW5yYW5kX2ludDMyKCkgKyAwLjUpKigxLjAvNDI5NDk2NzI5Ni4wKTsgXG4gIC8qIGRpdmlkZWQgYnkgMl4zMiAqL1xufVxuIFxuLyogZ2VuZXJhdGVzIGEgcmFuZG9tIG51bWJlciBvbiBbMCwxKSB3aXRoIDUzLWJpdCByZXNvbHV0aW9uKi9cbk1lcnNlbm5lVHdpc3Rlci5wcm90b3R5cGUuZ2VucmFuZF9yZXM1MyA9IGZ1bmN0aW9uKCkgeyBcbiAgdmFyIGE9dGhpcy5nZW5yYW5kX2ludDMyKCk+Pj41LCBiPXRoaXMuZ2VucmFuZF9pbnQzMigpPj4+NjsgXG4gIHJldHVybihhKjY3MTA4ODY0LjArYikqKDEuMC85MDA3MTk5MjU0NzQwOTkyLjApOyBcbn0gXG5cbi8qIFRoZXNlIHJlYWwgdmVyc2lvbnMgYXJlIGR1ZSB0byBJc2FrdSBXYWRhLCAyMDAyLzAxLzA5IGFkZGVkICovXG5cbjsgYnJvd3NlcmlmeV9zaGltX19kZWZpbmVfX21vZHVsZV9fZXhwb3J0X18odHlwZW9mIE1lcnNlbm5lVHdpc3RlciAhPSBcInVuZGVmaW5lZFwiID8gTWVyc2VubmVUd2lzdGVyIDogd2luZG93Lk1lcnNlbm5lVHdpc3Rlcik7XG5cbn0pLmNhbGwoZ2xvYmFsLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGZ1bmN0aW9uIGRlZmluZUV4cG9ydChleCkgeyBtb2R1bGUuZXhwb3J0cyA9IGV4OyB9KTtcbiIsInZhciBQb2ludCA9IHJlcXVpcmUoXCJ1dGlsL1BvaW50XCIpO1xudmFyIENvbG9yID0gcmVxdWlyZShcInV0aWwvQ29sb3JcIik7XG5cblBhcnRpY2xlLl9VSUQgPSBQYXJ0aWNsZS5fVUlEIHx8IHt2YWx1ZTogMH07XG5cbmZ1bmN0aW9uIFBhcnRpY2xlKCkge1xuXHR0aGlzLm5leHQgPSBudWxsO1xuXHR0aGlzLnByZXYgPSBudWxsO1xuXG5cdHRoaXMudWlkID0gUGFydGljbGUuX1VJRC52YWx1ZSsrO1xuXG5cdHRoaXMubWF4TGlmZVRpbWUgPSAwO1xuXHR0aGlzLmxpZmVUaW1lID0gMDtcblx0dGhpcy5saWZlUHJvZ3Jlc3MgPSAwO1xuXG5cdHRoaXMucG9zaXRpb24gPSBuZXcgUG9pbnQoKTtcblx0dGhpcy5hY2NlbGVyYXRpb24gPSBuZXcgUG9pbnQoKTtcblx0dGhpcy52ZWxvY2l0eSA9IG5ldyBQb2ludCgpO1xuXG5cdHRoaXMuc2l6ZSA9IG5ldyBQb2ludCgxLCAxKTtcblx0dGhpcy5zaXplU3RhcnQgPSBuZXcgUG9pbnQoKTtcblx0dGhpcy5zaXplRW5kID0gbmV3IFBvaW50KCk7XG5cblxuXHR0aGlzLmNvbG9yID0gbmV3IENvbG9yKDI1NSwgMjU1LCAyNTUsIDEpO1xuXHR0aGlzLmNvbG9yU3RhcnQgPSBuZXcgQ29sb3IoKTtcblx0dGhpcy5jb2xvckVuZCA9IG5ldyBDb2xvcigpO1xufVxuXG5QYXJ0aWNsZS5wcm90b3R5cGUuaXNEZWFkID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLmxpZmVUaW1lID49IHRoaXMubWF4TGlmZVRpbWU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcnRpY2xlO1xuIiwidmFyIE1hdGhVdGlsID0gcmVxdWlyZShcInV0aWwvTWF0aFV0aWxcIik7XG5cbmZ1bmN0aW9uIENvbG9yKHIsIGcsIGIsIGFscGhhKSB7XG5cdHRoaXMuciA9IHIgfHwgMDtcblx0dGhpcy5nID0gZyB8fCAwO1xuXHR0aGlzLmIgPSBiIHx8IDA7XG5cdHRoaXMuYWxwaGEgPSBhbHBoYSB8fCAwO1xufVxuXG5Db2xvci5wcm90b3R5cGUuY29weUZyb20gPSBmdW5jdGlvbihjb2xvcikge1xuXHR0aGlzLnIgPSBjb2xvci5yO1xuXHR0aGlzLmcgPSBjb2xvci5nO1xuXHR0aGlzLmIgPSBjb2xvci5iO1xuXHR0aGlzLmFscGhhID0gY29sb3IuYWxwaGE7XG59O1xuXG5Db2xvci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oY29sb3IpIHtcblx0dGhpcy5yICs9IGNvbG9yLnI7XG5cdHRoaXMuZyArPSBjb2xvci5nO1xuXHR0aGlzLmIgKz0gY29sb3IuYjtcblx0dGhpcy5hbHBoYSArPSBjb2xvci5hbHBoYTtcbn07XG5cbkNvbG9yLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihyLGcsYixhKSB7XG5cdHRoaXMuciA9IHIgfHwgMDtcblx0dGhpcy5nID0gZyB8fCAwO1xuXHR0aGlzLmIgPSBiIHx8IDA7XG5cdHRoaXMuYWxwaGEgPSBhIHx8IDA7XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCBcImhleFwiLCB7XG5cdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGhleCA9IHRoaXMuciA8PCAxNjtcblx0XHRoZXggPSBoZXggfCB0aGlzLmcgPDwgODtcblx0XHRoZXggPSBoZXggfCB0aGlzLmI7XG5cdFx0cmV0dXJuIGhleDtcblx0fSxcblx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdHRoaXMuciA9ICh2YWx1ZSAmIDB4RkYwMDAwKSA+PiAxNjtcblx0XHR0aGlzLmcgPSAodmFsdWUgJiAweEZGMDApID4+IDg7XG5cdFx0dGhpcy5iID0gKHZhbHVlICYgMHhGRik7XG5cdH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCBcInJcIiwge1xuXHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLl9yO1xuXHR9LFxuXHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0dGhpcy5fciA9IE1hdGhVdGlsLmNsYW1wKHZhbHVlLCAwLCAyNTUpO1xuXHR9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgXCJnXCIsIHtcblx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5fZztcblx0fSxcblx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdHRoaXMuX2cgPSBNYXRoVXRpbC5jbGFtcCh2YWx1ZSwgMCwgMjU1KTtcblx0fVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsIFwiYlwiLCB7XG5cdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2I7XG5cdH0sXG5cdHNldDogZnVuY3Rpb24odmFsdWUpIHtcblx0XHR0aGlzLl9iID0gTWF0aFV0aWwuY2xhbXAodmFsdWUsIDAsIDI1NSk7XG5cdH1cbn0pO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsIFwiYWxwaGFcIiwge1xuXHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLl9hbHBoYTtcblx0fSxcblx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdHRoaXMuX2FscGhhID0gTWF0aFV0aWwuY2xhbXAodmFsdWUsIDAsIDEpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2xvcjsiLCJmdW5jdGlvbiBMaXN0KCkge1xuXHR0aGlzLmZpcnN0ID0gbnVsbDtcblx0dGhpcy5sZW5ndGggPSAwO1xufVxuXG5MaXN0LnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLmZpcnN0ID09PSBudWxsO1xufTtcblxuTGlzdC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oaXRlbSkge1xuXHRpdGVtLnByZXYgPSBudWxsO1xuXHRpdGVtLm5leHQgPSBudWxsO1xuXHRpZiAodGhpcy5maXJzdCkge1xuXHRcdHRoaXMuZmlyc3QucHJldiA9IGl0ZW07XG5cdH1cblxuXHRpdGVtLm5leHQgPSB0aGlzLmZpcnN0O1xuXHR0aGlzLmZpcnN0ID0gaXRlbTtcblx0dGhpcy5sZW5ndGgrKztcblx0cmV0dXJuIGl0ZW07XG59O1xuXG5MaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0dmFyIGN1cnJlbnQgPSB0aGlzLmZpcnN0O1xuXHR2YXIgbmV4dCA9IG51bGw7XG5cdHdoaWxlIChjdXJyZW50KSB7XG5cdFx0bmV4dCA9IGN1cnJlbnQubmV4dDtcblx0XHRjYWxsYmFjayhjdXJyZW50KTtcblx0XHRjdXJyZW50ID0gbmV4dDtcblx0fVxufTtcblxuTGlzdC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oaXRlbSkge1xuXHR2YXIgcHJldmlvdXMgPSBpdGVtLnByZXY7XG5cdHZhciBuZXh0ID0gaXRlbS5uZXh0O1xuXG5cdGlmIChwcmV2aW91cylcblx0XHRwcmV2aW91cy5uZXh0ID0gbmV4dDtcblxuXHRpZiAobmV4dClcblx0XHRuZXh0LnByZXYgPSBwcmV2aW91cztcblxuXHRpZiAodGhpcy5maXJzdCA9PT0gaXRlbSlcblx0XHR0aGlzLmZpcnN0ID0gaXRlbS5uZXh0O1xuXG5cdGl0ZW0ucHJldiA9IG51bGw7XG5cdGl0ZW0ubmV4dCA9IG51bGw7XG5cdHRoaXMubGVuZ3RoLS07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3Q7XG4iLCJmdW5jdGlvbiBNYXRoVXRpbCgpIHtcbn1cblxuTWF0aFV0aWwuRVBTSUxPTiA9IDIuMjIwNDQ2MDQ5MjUwMzEzZS0xNjtcblxuTWF0aFV0aWwuY2xhbXAgPSBmdW5jdGlvbih2YWx1ZSwgbWluLCBtYXgpIHtcblx0cmV0dXJuIE1hdGgubWF4KG1pbiwgTWF0aC5taW4odmFsdWUsIG1heCkpO1xufTtcblxuTWF0aFV0aWwuYXJlRXF1YWwgPSBmdW5jdGlvbihhLCBiKSB7XG5cdHJldHVybiBNYXRoLmFicyhhIC0gYikgPCBNYXRoVXRpbC5FUFNJTE9OO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXRoVXRpbDsiLCJ2YXIgUGFydGljbGUgPSByZXF1aXJlKFwiUGFydGljbGVcIik7XG5cblBhcnRpY2xlUG9vbC5nbG9iYWwgPSBuZXcgUGFydGljbGVQb29sKCk7XG5cbmZ1bmN0aW9uIFBhcnRpY2xlUG9vbCgpIHtcblx0dGhpcy5maXJzdCA9IG51bGw7XG59XG5cblBhcnRpY2xlUG9vbC5wcm90b3R5cGUucG9wID0gZnVuY3Rpb24oKSB7XG5cdGlmICghdGhpcy5maXJzdClcblx0XHRyZXR1cm4gdGhpcy5jcmVhdGUoKTtcblxuXHR2YXIgY3VycmVudCA9IHRoaXMuZmlyc3Q7XG5cdHRoaXMuZmlyc3QgPSBjdXJyZW50Lm5leHQ7XG5cdGN1cnJlbnQubmV4dCA9IG51bGw7XG5cdHJldHVybiBjdXJyZW50O1xufTtcblxuUGFydGljbGVQb29sLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIG5ldyBQYXJ0aWNsZSgpO1xufTtcblxuUGFydGljbGVQb29sLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24ocGFydGljbGUpIHtcblx0cGFydGljbGUubmV4dCA9IHRoaXMuZmlyc3Q7XG5cdHRoaXMuZmlyc3QgPSBwYXJ0aWNsZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGFydGljbGVQb29sOyIsIlxuZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuXHR0aGlzLnggPSB4IHx8IDA7XG5cdHRoaXMueSA9IHkgfHwgMDtcbn1cblxuUG9pbnQucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKHgsIHkpIHtcblx0dGhpcy54ID0geDtcblx0dGhpcy55ID0geSA9PT0gdW5kZWZpbmVkID8gdGhpcy55IDogeTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuY29weUZyb20gPSBmdW5jdGlvbihwb2ludCkge1xuXHR0aGlzLnggPSBwb2ludC54O1xuXHR0aGlzLnkgPSBwb2ludC55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cblBvaW50LnByb3RvdHlwZS5tdWx0aXBsYXlCeVNjYWxhciA9IGZ1bmN0aW9uKHNjYWxhcikge1xuXHR0aGlzLnggKj0gc2NhbGFyO1xuXHR0aGlzLnkgKj0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cblBvaW50LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihwb2ludCkge1xuXHR0aGlzLnggKz0gcG9pbnQueDtcblx0dGhpcy55ICs9IHBvaW50Lnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb2ludDsiLCJ2YXIgUGFydGljbGUgPSByZXF1aXJlKFwiUGFydGljbGVcIik7XG5cbmRlc2NyaWJlKFwiUGFydGljbGVUZXN0XCIsIGZ1bmN0aW9uKCkge1xuXG5cdGl0KFwiVUlEIGdlbmVyYXRpb25cIiwgZnVuY3Rpb24oKSB7XG5cdFx0YXNzZXJ0LmVxdWFsKG5ldyBQYXJ0aWNsZSgpLnVpZCwgUGFydGljbGUuX1VJRC52YWx1ZSAtIDEpO1xuXHRcdGFzc2VydC5lcXVhbChuZXcgUGFydGljbGUoKS51aWQsIFBhcnRpY2xlLl9VSUQudmFsdWUgLSAxKTtcblx0XHRhc3NlcnQuZXF1YWwobmV3IFBhcnRpY2xlKCkudWlkLCBQYXJ0aWNsZS5fVUlELnZhbHVlIC0gMSk7XG5cdH0pO1xuXG5cdGl0KFwiVUlEIGlzIHVuaXF1ZVwiLCBmdW5jdGlvbigpIHtcblx0XHR1aWRzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IDEwMDA7ICsraSl7XG5cdFx0XHR2YXIgcGFydGljbGUgPSBuZXcgUGFydGljbGUoKTtcblxuXHRcdFx0YXNzZXJ0Lm9rKCF1aWRzW3BhcnRpY2xlLnVpZF0pO1xuXHRcdFx0dWlkc1twYXJ0aWNsZS51aWRdID0gdHJ1ZTtcblx0XHR9XG5cdH0pO1xuXG5cdGl0KFwiaXNEZWFkXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBkZWFkID0gbmV3IFBhcnRpY2xlKCk7XG5cdFx0ZGVhZC5saWZlID0gMDtcblx0XHR2YXIgYWxpdmUgPSBuZXcgUGFydGljbGUoKTtcblx0XHRhbGl2ZS5jdXJyZW50TGlmZVRpbWUgPSA1NTtcblx0XHRhbGl2ZS5tYXhMaWZlVGltZSA9IDk5OTk7XG5cblx0XHRhc3NlcnQub2soZGVhZC5pc0RlYWQoKSk7XG5cdFx0YXNzZXJ0Lm9rKCFhbGl2ZS5pc0RlYWQoKSk7XG5cdH0pO1xufSk7XG4iLCJ2YXIgQ29sb3IgPSByZXF1aXJlKFwidXRpbC9Db2xvclwiKTtcblxuZGVzY3JpYmUoXCJDb2xvclRlc3RcIiwgZnVuY3Rpb24oKSB7XG5cblx0dmFyIGlzRXF1YWwgPSBmdW5jdGlvbihzb3VyY2UsIHRhcmdldCkge1xuXHRcdHJldHVybiBzb3VyY2UuciA9PT0gdGFyZ2V0LnIgJiYgc291cmNlLmcgPT09IHRhcmdldC5nICYmIHNvdXJjZS5iID09PSB0YXJnZXQuYjtcblx0fTtcblxuXHRpdChcImNvbnN0dWN0b3IgLSBkZWZhdWx0XCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBjb2xvciA9IG5ldyBDb2xvcigpO1xuXG5cdFx0YXNzZXJ0LmVxdWFsKGNvbG9yLnIsIDApO1xuXHRcdGFzc2VydC5lcXVhbChjb2xvci5nLCAwKTtcblx0XHRhc3NlcnQuZXF1YWwoY29sb3IuYiwgMCk7XG5cdH0pO1xuXG5cdGl0KFwiY29uc3R1Y3RvciAtIGN1c3RvbSByXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBjb2xvciA9IG5ldyBDb2xvcigxMCk7XG5cblx0XHRhc3NlcnQuZXF1YWwoY29sb3IuciwgMTApO1xuXHRcdGFzc2VydC5lcXVhbChjb2xvci5nLCAwKTtcblx0XHRhc3NlcnQuZXF1YWwoY29sb3IuYiwgMCk7XG5cdH0pO1xuXG5cdGl0KFwiY29uc3R1Y3RvciAtIGN1c3RvbSByZ1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgY29sb3IgPSBuZXcgQ29sb3IoMTAsIDIwKTtcblxuXHRcdGFzc2VydC5lcXVhbChjb2xvci5yLCAxMCk7XG5cdFx0YXNzZXJ0LmVxdWFsKGNvbG9yLmcsIDIwKTtcblx0XHRhc3NlcnQuZXF1YWwoY29sb3IuYiwgMCk7XG5cdH0pO1xuXG5cdGl0KFwiY29uc3R1Y3RvciAtIGN1c3RvbSByZ2JcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGNvbG9yID0gbmV3IENvbG9yKDEwLCAyMCwgMzApO1xuXG5cdFx0YXNzZXJ0LmVxdWFsKGNvbG9yLnIsIDEwKTtcblx0XHRhc3NlcnQuZXF1YWwoY29sb3IuZywgMjApO1xuXHRcdGFzc2VydC5lcXVhbChjb2xvci5iLCAzMCk7XG5cdH0pO1xuXG5cdGl0KFwiY29weUZyb21cIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGNvbG9yID0gbmV3IENvbG9yKCk7XG5cdFx0Y29sb3IuY29weUZyb20obmV3IENvbG9yKDEsIDIpKTtcblxuXHRcdGFzc2VydC5lcXVhbChjb2xvci5yLCAxKTtcblx0XHRhc3NlcnQuZXF1YWwoY29sb3IuZywgMik7XG5cdFx0YXNzZXJ0LmVxdWFsKGNvbG9yLmIsIDApO1xuXHR9KTtcblxuXHRpdChcImFkZFwiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgY29sb3IgPSBuZXcgQ29sb3IoNSwgNSwgNSk7XG5cdFx0Y29sb3IuYWRkKG5ldyBDb2xvcigxLCAyKSk7XG5cblx0XHRhc3NlcnQuZXF1YWwoY29sb3IuciwgNik7XG5cdFx0YXNzZXJ0LmVxdWFsKGNvbG9yLmcsIDcpO1xuXHRcdGFzc2VydC5lcXVhbChjb2xvci5iLCA1KTtcblx0fSk7XG5cblx0aXQoXCJoZXggLSBmcm9tIHJnYlwiLCBmdW5jdGlvbigpIHtcblx0XHRhc3NlcnQuZXF1YWwobmV3IENvbG9yKDE1MywgNTAsIDIwNCkuaGV4LCAweDk5MzJDQyk7XG5cdFx0YXNzZXJ0LmVxdWFsKG5ldyBDb2xvcigxMjMsIDEwNCwgMjM4KS5oZXgsIDB4N0I2OEVFKTtcblx0XHRhc3NlcnQuZXF1YWwobmV3IENvbG9yKDI1MCwgMjUwLCAyMTApLmhleCwgMHhGQUZBRDIpO1xuXHR9KTtcblxuXHRpdChcImhleCAtIHRvIHJnYlwiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgY29sb3IgPSBuZXcgQ29sb3IoKTtcblxuXHRcdGNvbG9yLmhleCA9IDB4OTkzMkNDO1xuXHRcdGFzc2VydC5vayhpc0VxdWFsKGNvbG9yLCBuZXcgQ29sb3IoMTUzLCA1MCwgMjA0KSkpO1xuXG5cdFx0Y29sb3IuaGV4ID0gMHg3QjY4RUU7XG5cdFx0YXNzZXJ0Lm9rKGlzRXF1YWwoY29sb3IsIG5ldyBDb2xvcigxMjMsIDEwNCwgMjM4KSkpO1xuXG5cdFx0Y29sb3IuaGV4ID0gMHhGQUZBRDI7XG5cdFx0YXNzZXJ0Lm9rKGlzRXF1YWwoY29sb3IsIG5ldyBDb2xvcigyNTAsIDI1MCwgMjEwKSkpO1xuXHR9KTtcblxuXHRpdChcIm92ZXJmbG93IHByb3RlY3Rpb25cIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGNvbG9yID0gbmV3IENvbG9yKDUwMCwgMjAwKTtcblx0XHRjb2xvci5nICs9IDIwMDtcblxuXHRcdGFzc2VydC5lcXVhbChjb2xvci5yLCAyNTUpO1xuXHRcdGFzc2VydC5lcXVhbChjb2xvci5nLCAyNTUpO1xuXHRcdGFzc2VydC5lcXVhbChjb2xvci5iLCAwKTtcblx0fSk7XG5cblx0aXQoXCJ1ZGVyZmxvdyBwcm90ZWN0aW9uXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBjb2xvciA9IG5ldyBDb2xvcigtMTAwLCA1MCk7XG5cdFx0Y29sb3IuZyAtPSAyMDA7XG5cblx0XHRhc3NlcnQuZXF1YWwoY29sb3IuciwgMCk7XG5cdFx0YXNzZXJ0LmVxdWFsKGNvbG9yLmcsIDApO1xuXHRcdGFzc2VydC5lcXVhbChjb2xvci5iLCAwKTtcblx0fSk7XG5cbn0pO1xuIiwidmFyIExpc3QgPSByZXF1aXJlKFwidXRpbC9MaXN0XCIpO1xuXG5kZXNjcmliZShcIkxpc3RUZXN0XCIsIGZ1bmN0aW9uKCkge1xuXG5cdGZ1bmN0aW9uIE1vY2sobnVtYmVyKSB7XG5cdFx0dGhpcy5udW1iZXIgPSBudW1iZXI7XG5cdFx0dGhpcy5uZXh0ID0gbnVsbDtcblx0XHR0aGlzLnByZXYgPSBudWxsO1xuXHR9XG5cblx0dmFyIGxpc3QgPSBudWxsO1xuXG5cdGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG5cdFx0bGlzdCA9IG5ldyBMaXN0KCk7XG5cdH0pO1xuXG5cdGl0KFwic2hvdWxkIGJlIGVtcHR5XCIsIGZ1bmN0aW9uKCkge1xuXHRcdGFzc2VydC5vayhsaXN0LmlzRW1wdHkoKSk7XG5cdH0pO1xuXG5cdGl0KFwic2hvdWxkIGJlIGVtcHR5IGFmdGVyIHJlbW92ZSBhbGwgZWxlbWVudHNcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0LmFkZChuZXcgTW9jaygpKTtcblx0XHR2YXIgaXRlbTIgPSBsaXN0LmFkZChuZXcgTW9jaygpKTtcblxuXHRcdGxpc3QucmVtb3ZlKGl0ZW0pO1xuXHRcdGxpc3QucmVtb3ZlKGl0ZW0yKTtcblxuXHRcdGFzc2VydC5vayhsaXN0LmlzRW1wdHkoKSk7XG5cdH0pO1xuXG5cdGl0KFwic2hvdWxkIE5PVCBiZSBlbXB0eVwiLCBmdW5jdGlvbigpIHtcblx0XHRsaXN0LmFkZChuZXcgTW9jaygpKTtcblx0XHRhc3NlcnQub2soIWxpc3QuaXNFbXB0eSgpKTtcblx0fSk7XG5cblx0aXQoXCJpdGVyYXRlIG92ZXIgbGlzdFwiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbGFzdCA9IDQ7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0OyArK2kpIHtcblx0XHRcdGxpc3QuYWRkKG5ldyBNb2NrKGkpKTtcblx0XHR9XG5cblx0XHRsaXN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0YXNzZXJ0LmVxdWFsKGl0ZW0ubnVtYmVyLCAtLWxhc3QpO1xuXHRcdH0pO1xuXHR9KTtcblxuXHRpdChcInJlbW92ZSBpdGVtIGluIGxvb3BcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGxhc3QgPSAxMDtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxhc3Q7ICsraSkge1xuXHRcdFx0bGlzdC5hZGQobmV3IE1vY2soaSkpO1xuXHRcdH1cblxuXHRcdHZhciB0b1JlbW92ZSA9IFsyLCA1LCA3LCA4XTtcblxuXHRcdGxpc3QuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRpZiAodG9SZW1vdmUuaW5kZXhPZihpdGVtLm51bWJlcikgPj0gMClcblx0XHRcdFx0bGlzdC5yZW1vdmUoaXRlbSk7XG5cblx0XHRcdGFzc2VydC5lcXVhbChpdGVtLm51bWJlciwgLS1sYXN0KTtcblx0XHR9KTtcblx0fSk7XG5cblx0aXQoXCJzaG91bGQgaGF2ZSBjb3JyZWN0IGxlbmd0aCBhZnRlciBhZGRcIiwgZnVuY3Rpb24oKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgKytpKSB7XG5cdFx0XHRsaXN0LmFkZChuZXcgTW9jayhpKSk7XG5cdFx0fVxuXG5cdFx0YXNzZXJ0LmVxdWFsKGxpc3QubGVuZ3RoLCAxMCk7XG5cdH0pO1xuXG5cdGl0KFwic2hvdWxkIGhhdmUgY29ycmVjdCBsZW5ndGggYWZ0ZXIgYWRkIGFuZCByZW1vdmVcIiwgZnVuY3Rpb24oKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgKytpKSB7XG5cdFx0XHRsaXN0LmFkZChuZXcgTW9jayhpKSk7XG5cdFx0fVxuXG5cdFx0bGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRcdGlmIChpdGVtLm51bWJlciA8IDUpIHtcblx0XHRcdFx0bGlzdC5yZW1vdmUoaXRlbSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgMTA7ICsraSkge1xuXHRcdFx0bGlzdC5hZGQobmV3IE1vY2soaSkpO1xuXHRcdH1cblxuXHRcdGFzc2VydC5lcXVhbChsaXN0Lmxlbmd0aCwgMTUpO1xuXHR9KTtcbn0pO1xuIiwidmFyIE1hdGhVdGlsID0gcmVxdWlyZShcInV0aWwvTWF0aFV0aWxcIik7XG5cbmRlc2NyaWJlKFwiTWF0aFV0aWxcIiwgZnVuY3Rpb24oKSB7XG5cblx0aXQoXCJjbGFtcCAtIG5vIGNoYW5nZVwiLCBmdW5jdGlvbigpIHtcblx0XHRhc3NlcnQuZXF1YWwoTWF0aFV0aWwuY2xhbXAoMCwgLTEwLCAxMCksIDApO1xuXHR9KTtcblxuXHRpdChcImNsYW1wIC0gdG8gbWluXCIsIGZ1bmN0aW9uKCkge1xuXHRcdGFzc2VydC5lcXVhbChNYXRoVXRpbC5jbGFtcCgtMTAwLCAtMTAsIDEwKSwgLTEwKTtcblx0fSk7XG5cblx0aXQoXCJjbGFtcCAtIHRvIG1heFwiLCBmdW5jdGlvbigpIHtcblx0XHRhc3NlcnQuZXF1YWwoTWF0aFV0aWwuY2xhbXAoOTksIC0xMCwgMTApLCAxMCk7XG5cdH0pO1xufSk7XG4iLCJ2YXIgUGFydGljbGVQb29sID0gcmVxdWlyZShcInV0aWwvUGFydGljbGVQb29sXCIpO1xuXG5kZXNjcmliZShcIlBhcnRpY2xlUG9vbFRlc3RcIiwgZnVuY3Rpb24oKSB7XG5cblx0dmFyIHNweSA9IG51bGw7XG5cdHZhciBwb29sID0gbnVsbDtcblxuXHRiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuXHRcdHBvb2wgPSBuZXcgUGFydGljbGVQb29sKCk7XG5cdFx0c3B5ID0gc2lub24uc3B5KHBvb2wsIFwiY3JlYXRlXCIpO1xuXHR9KTtcblxuXHRhZnRlckVhY2goZnVuY3Rpb24oKSB7XG5cdFx0c3B5LnJlc3RvcmUoKTtcblx0fSk7XG5cblx0aXQoXCJzaG91bGQgY3JlYXRlIG9uZSBpbnN0YW5jZSBvZiBQYXJ0aWNsZVwiLCBmdW5jdGlvbigpIHtcblx0XHRwb29sLnBvcCgpO1xuXHRcdGFzc2VydC5vayhzcHkuY2FsbGVkT25jZSk7XG5cdH0pO1xuXG5cdGl0KFwic2hvdWxkIGNyZWF0ZSB0d28gaW5zdGFuY2VzIG9mIFBhcnRpY2xlXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHBvb2wucG9wKCk7XG5cdFx0cG9vbC5wb3AoKTtcblx0XHRhc3NlcnQub2soc3B5LmNhbGxlZFR3aWNlKTtcblx0fSk7XG5cblx0aXQoXCJzaG91bGQgaGF2ZSBvbmUgaW5zdGFuY2Ugb2YgUGFydGljbGUgYWZ0ZXIgcG9wL3B1c2gvcG9wXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBwYXJ0aWNsZSA9IHBvb2wucG9wKCk7XG5cdFx0cG9vbC5wdXNoKHBhcnRpY2xlKTtcblx0XHRwb29sLnBvcCgpO1xuXHRcdGFzc2VydC5vayhzcHkuY2FsbGVkT25jZSk7XG5cdH0pO1xuXG5cdGl0KFwic2hvdWxkIGhhdmUgdHdvIGluc3RhbmNlIG9mIFBhcnRpY2xlIGFmdGVyIHNlcXVlbmNlIG9mIHBvcC9wdXNoXCIsIGZ1bmN0aW9uKCkge1xuXG5cdFx0dmFyIHBhcnRpY2xlMSwgcGFydGljbGUyO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0cGFydGljbGUxID0gcG9vbC5wb3AoKTtcblx0XHRcdHBhcnRpY2xlMiA9IHBvb2wucG9wKCk7XG5cblx0XHRcdHBvb2wucHVzaChwYXJ0aWNsZTEpO1xuXHRcdFx0cG9vbC5wdXNoKHBhcnRpY2xlMik7XG5cdFx0fVxuXHRcdGFzc2VydC5vayhzcHkuY2FsbGVkVHdpY2UpO1xuXHR9KTtcblxuXHRpdChcInNob3VsZCByZXR1cm4gdGhlIHNhbWUgaW5zdGFuY2Ugb2YgcGFydGljbGVcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHBhcnRpY2xlID0gcG9vbC5wb3AoKTtcblx0XHR2YXIgcHJldmlvdXMgPSBwYXJ0aWNsZTtcblx0XHRwb29sLnB1c2gocGFydGljbGUpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHRwYXJ0aWNsZSA9IHBvb2wucG9wKCk7XG5cdFx0XHRhc3NlcnQuZGVlcEVxdWFsKHByZXZpb3VzLCBwYXJ0aWNsZSk7XG5cblx0XHRcdHByZXZpb3VzID0gcGFydGljbGU7XG5cdFx0XHRwb29sLnB1c2gocGFydGljbGUpO1xuXHRcdH1cblx0fSk7XG5cbn0pO1xuIiwidmFyIFBvaW50ID0gcmVxdWlyZShcInV0aWwvUG9pbnRcIik7XG5cbmRlc2NyaWJlKFwiUG9pbnRUZXN0XCIsIGZ1bmN0aW9uKCkge1xuXG5cdGl0KFwiY29uc3R1Y3RvciAtIGRlZmF1bHRcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHBvaW50ID0gbmV3IFBvaW50KCk7XG5cblx0XHRhc3NlcnQuZXF1YWwocG9pbnQueCwgMCk7XG5cdFx0YXNzZXJ0LmVxdWFsKHBvaW50LnksIDApO1xuXHR9KTtcblxuXHRpdChcImNvbnN0dWN0b3IgLSBjdXN0b20gcGFyYW1zXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBwb2ludCA9IG5ldyBQb2ludCgxMCwgNTApO1xuXG5cdFx0YXNzZXJ0LmVxdWFsKHBvaW50LngsIDEwKTtcblx0XHRhc3NlcnQuZXF1YWwocG9pbnQueSwgNTApO1xuXHR9KTtcblxuXHRpdChcInNldCAtIG9ubHkgeCB2YWx1ZVwiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgcG9pbnQgPSBuZXcgUG9pbnQoMTAsIDUwKTtcblx0XHRwb2ludC5zZXQoOTkpO1xuXG5cdFx0YXNzZXJ0LmVxdWFsKHBvaW50LngsIDk5KTtcblx0XHRhc3NlcnQuZXF1YWwocG9pbnQueSwgNTApO1xuXHR9KTtcblxuXHRpdChcInNldFwiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgcG9pbnQgPSBuZXcgUG9pbnQoMjIsIDU0KTtcblx0XHRwb2ludC5zZXQoOTksIDApO1xuXG5cdFx0YXNzZXJ0LmVxdWFsKHBvaW50LngsIDk5KTtcblx0XHRhc3NlcnQuZXF1YWwocG9pbnQueSwgMCk7XG5cdH0pO1xuXG5cdGl0KFwiY29weUZyb21cIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHBvaW50ID0gbmV3IFBvaW50KDQ0LCA0Mik7XG5cdFx0cG9pbnQuY29weUZyb20obmV3IFBvaW50KDEsIDIpKTtcblxuXHRcdGFzc2VydC5lcXVhbChwb2ludC54LCAxKTtcblx0XHRhc3NlcnQuZXF1YWwocG9pbnQueSwgMik7XG5cdH0pO1xuXG5cdGl0KFwibXVsdGlwbHlCeVNjYWxhclwiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgcG9pbnQgPSBuZXcgUG9pbnQoNSwgMTApO1xuXHRcdHBvaW50Lm11bHRpcGxheUJ5U2NhbGFyKDUpO1xuXG5cdFx0YXNzZXJ0LmVxdWFsKHBvaW50LngsIDI1KTtcblx0XHRhc3NlcnQuZXF1YWwocG9pbnQueSwgNTApO1xuXHR9KTtcblxuXHRpdChcImFkZFwiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgcG9pbnQgPSBuZXcgUG9pbnQoNSwgMTApO1xuXHRcdHBvaW50LmFkZChuZXcgUG9pbnQoMywgMykpO1xuXG5cdFx0YXNzZXJ0LmVxdWFsKHBvaW50LngsIDgpO1xuXHRcdGFzc2VydC5lcXVhbChwb2ludC55LCAxMyk7XG5cdH0pO1xuXG59KTtcbiJdfQ==
