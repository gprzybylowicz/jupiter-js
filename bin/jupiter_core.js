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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdXRpbC9Qb2ludC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuXHR0aGlzLnggPSB4IHx8IDA7XG5cdHRoaXMueSA9IHkgfHwgMDtcbn1cblxuUG9pbnQucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKHgsIHkpIHtcblx0dGhpcy54ID0geDtcblx0dGhpcy55ID0geSA9PT0gdW5kZWZpbmVkID8gdGhpcy55IDogeTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuY29weUZyb20gPSBmdW5jdGlvbihwb2ludCkge1xuXHR0aGlzLnggPSBwb2ludC54O1xuXHR0aGlzLnkgPSBwb2ludC55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cblBvaW50LnByb3RvdHlwZS5tdWx0aXBsYXlCeVNjYWxhciA9IGZ1bmN0aW9uKHNjYWxhcikge1xuXHR0aGlzLnggKj0gc2NhbGFyO1xuXHR0aGlzLnkgKj0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cblBvaW50LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihwb2ludCkge1xuXHR0aGlzLnggKz0gcG9pbnQueDtcblx0dGhpcy55ICs9IHBvaW50Lnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb2ludDsiXX0=
