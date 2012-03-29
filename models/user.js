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
		checkins: [new Schema({
			timestamp:Date,
			checkin:{type: ObjectId, ref: 'Checkin'}
		})],
		patches: [new Schema({
			timestamp:Date,
			patch: {type: ObjectId, ref: 'Patch'},
			claimed: {type: Boolean, default:false}
		})]
});

module.exports = db.model('User', userSchema);
