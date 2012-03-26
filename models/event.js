var db = require('mongoose')
  , Schema = db.Schema,
  ObjectId=Schema.ObjectId;

var eventSchema = new Schema({	
		name:String,
		time:{start:Date, end:Date},
		poster_url:String,
		description:String,
		facebook_url:String
});
var Event = db.model('Event', eventSchema);
module.exports.Event = Event;
module.exports.eventSchema = eventSchema;