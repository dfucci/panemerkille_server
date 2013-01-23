var db = require('mongoose')
  , Schema = db.Schema,
  ObjectId=Schema.ObjectId;

var leaderboardSchema = new Schema({
		// venue:{type: ObjectId, ref: 'Venue'},
		// user:{type:ObjectId, ref:'User'},
		// 
		// user:String,
		// venue:String,
		totalPoints:Number,
		tempPoints:Number
});

module.exports = db.model('Leaderboard', leaderboardSchema);