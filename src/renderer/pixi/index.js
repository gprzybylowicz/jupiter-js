var jupiter = {
	Renderer: require("./Renderer.js")
};

module.exports = jupiter;

var engine = require("../../engine");
var Cache = require("../Cache.js");

jupiter.cache = new Cache();
Object.assign(jupiter, engine);

jupiter.create = function(configName, textureName) {
	var config = jupiter.cache.get(configName);
	var texture = PIXI.Texture.fromFrame(textureName);

	var emitter = new engine.Emitter();
	emitter.getParser().read(config);
	return new jupiter.Renderer(emitter, texture);
};

