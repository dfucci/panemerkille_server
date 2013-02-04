var db = require('mongoose')
  , Schema = db.Schema,
  ObjectId=Schema.ObjectId;

var leaderboardSchema = new Schema({
		venue:{type: ObjectId, ref: 'Venue'},
		user:{type:ObjectId, ref:'User'},
		totalPoints:{type:Number, default:0},
		tempPoints:{type:Number, default:0}
	}
);


module.exports = db.model('Leaderboard', leaderboardSchema);