//TODO: imposta i default e limiti
//TODO: aggiungere signup date
//TODO: usa Mongoose Virtuals per il nome
var db = require('mongoose')
  , Schema = db.Schema
  , ObjectId=Schema.ObjectId;

var userSchema = new Schema({
		name:{firstname:String,surname:String},
		city:String,
		birthdate:String,
		gender:String,
		picture_url:String,
		facebook_id:String,
		email:String,
		patches: [new Schema({
			timestamp:Date,
			patch: {type: ObjectId, ref: 'Patch'},
			claimed: {type: Boolean, default:false}
		})],
		checkins: [new Schema({
			timestamp:Date,
			event:{type: ObjectId, ref: 'Event'}
		})],
		friends: [new Schema({
			friend: {type:ObjectId, ref:'User'}
		})]
});

module.exports = db.model('User', userSchema);
