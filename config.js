var config = {};
config.restify={};
config.mongo={};
config.restify.port = process.env.PORT || 7777;
//config.mongo.url = process.env.MONGOLAB_URI || "mongodb://localhost/heroku_app3697279";
config.mongo.url = "mongodb://panemerkille:da85da85te84@ds049157.mongolab.com:49157/panemerkille-stagin";
module.exports = config;