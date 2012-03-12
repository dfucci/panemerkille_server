
var db = require('mongoose')
  , Schema = db.Schema;

var venueSchema = new Schema({
		lat:Number,
		lon:Number,
		city:String,
		featured:Boolean,
		name:String,
		address:String,
		picture_url:String,
		description:String
});

module.exports = db.model('Venue', venueSchema);
