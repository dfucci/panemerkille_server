
var db = require('mongoose')
  , Schema = db.Schema;
  
var Event = require('./event').eventSchema;

var venueSchema = new Schema({
		lat:Number,
		lon:Number,
		city:String,
		featured:Boolean,
		name:String,
		address:String,
		picture_url:String,                                                
		description:String,
		events: [Event]
});

module.exports = db.model('Venue', venueSchema);
