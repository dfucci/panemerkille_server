//TODO imposta i default e limiti
var db = require('mongoose')
  , Schema = db.Schema;

var userSchema = new Schema({

		name:String,
		surname:String,
		birthdate:String,
		gender:String,
		picture_url:String,
		facebook_id:String,
<<<<<<< HEAD
		email:String,
		
=======
		email:String
>>>>>>> 7e0ab122a1aa7e45e7841e8fe83bbcb62c0d9674
});

module.exports = db.model('User', userSchema);
