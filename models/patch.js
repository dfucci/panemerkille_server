var db = require('mongoose')
  , Schema = db.Schema,
  ObjectId=Schema.ObjectId;

var patchSchema = new Schema({	
		name:String,
		image_url:String,
		description:String
});

module.exports = db.model('Patch', patchSchema);