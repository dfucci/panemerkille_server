var db = require('mongoose')
  , Schema = db.Schema,
  ObjectId=Schema.ObjectId;

var eventSchema = new Schema({	
		name:String,
		time:{start:Date, end:Date},
		poster_url:String,
		description:String,
		facebook_url:String
});

module.exports = db.model('Patch', patchSchema);