//var Parser = require("jupiter").config.Parser;
//var Behaviour = require("jupiter").Behaviour;
//var Point = require("jupiter").Point;
//var Color = require("jupiter").Color;
//
//describe("ParserTest", function() {
//
//	it("writePoint", function() {
//		var parser = new Parser(new Behaviour());
//		var point = new Point(2, 5);
//
//		var rawData = parser._writePoint(point);
//		assert.equal(rawData.x, point.x);
//		assert.equal(rawData.y, point.y);
//	});
//
//	it("readPoint", function() {
//		var parser = new Parser(new Behaviour());
//		var rawData = {x: 3, y: 6};
//
//		var point = parser._readPoint(rawData);
//		assert.equal(point.x, rawData.x);
//		assert.equal(point.y, rawData.y);
//	});
//
//	it("readPoint default values when no config", function() {
//		var parser = new Parser(new Behaviour());
//
//		var point = parser._readPoint(undefined);
//		assert.equal(point.x, 0);
//		assert.equal(point.y, 0);
//	});
//
//	it("writeColor", function() {
//		var parser = new Parser(new Behaviour());
//		var color = new Color();
//		color.alpha = 0.5;
//		color.hex = 0xff6622;
//
//		var rawData = parser._writeColor(color);
//		assert.equal(rawData.hex, color.hex);
//		assert.equal(rawData.alpha, color.alpha);
//	});
//
//	it("readColor", function() {
//		var parser = new Parser(new Behaviour());
//		var rawData = {hex: 0x778899, alpha: 0.1};
//
//		var color = parser._readColor(rawData);
//		assert.equal(color.hex, rawData.hex);
//		assert.equal(color.alpha, rawData.alpha);
//	});
//
//	it("readColor default values when no config", function() {
//		var parser = new Parser(new Behaviour());
//
//		var color = parser._readColor(undefined);
//		assert.equal(color.hex, 0x000000);
//		assert.equal(color.alpha, 0);
//	});
//
//});
