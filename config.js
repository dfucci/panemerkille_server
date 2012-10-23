var config = {};
config.restify={};
config.mongo={};
config.restify.port = process.env.PORT || 7777;
config.mongo.url = process.env.MONGOLAB_URI || "mongodb://panemerkille:da85da85te84@ds031647.mongolab.com:31647/heroku_app3697279";
module.exports = config;