(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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
},{}]},{},[1])


},{}],2:[function(require,module,exports){

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
},{}],3:[function(require,module,exports){
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

},{"util/Point":2}]},{},[1,3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdXRpbC9Qb2ludC5qcyIsInRlc3Qvc3JjL3V0aWwvUG9pbnRUZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbmZ1bmN0aW9uIFBvaW50KHgsIHkpIHtcblx0dGhpcy54ID0geCB8fCAwO1xuXHR0aGlzLnkgPSB5IHx8IDA7XG59XG5cblBvaW50LnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbih4LCB5KSB7XG5cdHRoaXMueCA9IHg7XG5cdHRoaXMueSA9IHkgPT09IHVuZGVmaW5lZCA/IHRoaXMueSA6IHk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmNvcHlGcm9tID0gZnVuY3Rpb24ocG9pbnQpIHtcblx0dGhpcy54ID0gcG9pbnQueDtcblx0dGhpcy55ID0gcG9pbnQueTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUubXVsdGlwbGF5QnlTY2FsYXIgPSBmdW5jdGlvbihzY2FsYXIpIHtcblx0dGhpcy54ICo9IHNjYWxhcjtcblx0dGhpcy55ICo9IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24ocG9pbnQpIHtcblx0dGhpcy54ICs9IHBvaW50Lng7XG5cdHRoaXMueSArPSBwb2ludC55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUG9pbnQ7IiwidmFyIFBvaW50ID0gcmVxdWlyZShcInV0aWwvUG9pbnRcIik7XG5cbmRlc2NyaWJlKFwiUG9pbnRUZXN0XCIsIGZ1bmN0aW9uKCkge1xuXG5cdGl0KFwiY29uc3R1Y3RvciAtIGRlZmF1bHRcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHBvaW50ID0gbmV3IFBvaW50KCk7XG5cblx0XHRhc3NlcnQuZXF1YWwocG9pbnQueCwgMCk7XG5cdFx0YXNzZXJ0LmVxdWFsKHBvaW50LnksIDApO1xuXHR9KTtcblxuXHRpdChcImNvbnN0dWN0b3IgLSBjdXN0b20gcGFyYW1zXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBwb2ludCA9IG5ldyBQb2ludCgxMCwgNTApO1xuXG5cdFx0YXNzZXJ0LmVxdWFsKHBvaW50LngsIDEwKTtcblx0XHRhc3NlcnQuZXF1YWwocG9pbnQueSwgNTApO1xuXHR9KTtcblxuXHRpdChcInNldCAtIG9ubHkgeCB2YWx1ZVwiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgcG9pbnQgPSBuZXcgUG9pbnQoMTAsIDUwKTtcblx0XHRwb2ludC5zZXQoOTkpO1xuXG5cdFx0YXNzZXJ0LmVxdWFsKHBvaW50LngsIDk5KTtcblx0XHRhc3NlcnQuZXF1YWwocG9pbnQueSwgNTApO1xuXHR9KTtcblxuXHRpdChcInNldFwiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgcG9pbnQgPSBuZXcgUG9pbnQoMjIsIDU0KTtcblx0XHRwb2ludC5zZXQoOTksIDApO1xuXG5cdFx0YXNzZXJ0LmVxdWFsKHBvaW50LngsIDk5KTtcblx0XHRhc3NlcnQuZXF1YWwocG9pbnQueSwgMCk7XG5cdH0pO1xuXG5cdGl0KFwiY29weUZyb21cIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHBvaW50ID0gbmV3IFBvaW50KDQ0LCA0Mik7XG5cdFx0cG9pbnQuY29weUZyb20obmV3IFBvaW50KDEsIDIpKTtcblxuXHRcdGFzc2VydC5lcXVhbChwb2ludC54LCAxKTtcblx0XHRhc3NlcnQuZXF1YWwocG9pbnQueSwgMik7XG5cdH0pO1xuXG5cdGl0KFwibXVsdGlwbHlCeVNjYWxhclwiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgcG9pbnQgPSBuZXcgUG9pbnQoNSwgMTApO1xuXHRcdHBvaW50Lm11bHRpcGxheUJ5U2NhbGFyKDUpO1xuXG5cdFx0YXNzZXJ0LmVxdWFsKHBvaW50LngsIDI1KTtcblx0XHRhc3NlcnQuZXF1YWwocG9pbnQueSwgNTApO1xuXHR9KTtcblxuXHRpdChcImFkZFwiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgcG9pbnQgPSBuZXcgUG9pbnQoNSwgMTApO1xuXHRcdHBvaW50LmFkZChuZXcgUG9pbnQoMywgMykpO1xuXG5cdFx0YXNzZXJ0LmVxdWFsKHBvaW50LngsIDgpO1xuXHRcdGFzc2VydC5lcXVhbChwb2ludC55LCAxMyk7XG5cdH0pO1xuXG59KTtcbiJdfQ==
