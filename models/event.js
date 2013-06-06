var db = require('mongoose')
  , Schema = db.Schema,
  ObjectId=Schema.ObjectId;

var eventSchema = new Schema({
	name: String,
	time: {
		start: Date,
		end: Date
	},
	poster_url: String,
	description: String,
	venue: {
		type: ObjectId,
		ref: 'Venue'
	},
	attenders: [new Schema({attender:{type:ObjectId, ref:'User'}})],
	tags: [{type:String}]
});

module.exports = db.model('Event', eventSchema);
// var Event = db.model('Event', eventSchema);
// module.exports.Event = Event;
// module.exports.eventSchema = eventSchema;