var config = {};
config.restify={};
config.mongo={};
config.restify.port = process.env.PORT || 7777;
config.mongo.url = process.env.MONGOLAB_URI || "mongodb://localhost/pm20120924";
module.exports = config;