
var db = require('mongoose')
  , Schema = db.Schema;

var userSchema = new Schema({
		name:String,
		surname:String,
		bithdate:String,
		gender:String,
		picture_url:String,
		facebook_id:String,
		email:String
});

module.exports = db.model('User', userSchema);
