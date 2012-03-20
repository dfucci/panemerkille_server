//TODO imposta i default e limiti
var db = require('mongoose')
  , Schema = db.Schema
  , ObjectId=Schema.ObjectId;

var Checkin=require('./checkin');
var Patch=require('./patch');
var userSchema = new Schema({
		name:String,
		surname:String,
		birthdate:String,
		gender:String,
		picture_url:String,
		facebook_id:String,
		email:String,
		checkins: [Checkin],
		patches: [{
			timestamp:{type:Date, default:Date.now, required:true},
			patch:ObjectId
		}]
});

module.exports = db.model('User', userSchema);
