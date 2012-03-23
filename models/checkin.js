var db = require('mongoose')
  , Schema = db.Schema,
  ObjectId=Schema.ObjectId;

var checkinSchema = new Schema({
		timestamp:{type:Date, default:Date.now},
		event:ObjectId,
		user:ObjectId
});

module.exports = db.model('Checkin', checkinSchema);