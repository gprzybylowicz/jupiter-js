var jupiter = {
	Renderer: require("./PIXIRenderer.js")
};

module.exports = jupiter;

var engine = require("../../engine");
Object.assign(jupiter, engine);
