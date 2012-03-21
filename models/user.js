//TODO imposta i default e limiti
var db = require('mongoose')
  , Schema = db.Schema
  , ObjectId=Schema.ObjectId;

var userSchema = new Schema({
		name:{firstname:String,surname:String},
		birthdate:String,
		gender:String,
		picture_url:String,
		facebook_id:String,
		email:String,
		checkins: [{
			timestamp:Date,
			party: ObjectId
		}],
		patches: [{
			timestamp:Date,
			patch:ObjectId
		}]
});

module.exports = db.model('User', userSchema);
