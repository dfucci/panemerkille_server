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
	price: String,
	age_limit: String,
	venue: {
		type: ObjectId,
		ref: 'Venue'
	},
	attenders: [new Schema({attender:{type:ObjectId, ref:'User'}})]
});

module.exports = db.model('Event', eventSchema);