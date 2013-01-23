//error code 4xx
var db = require('mongoose')
  , Schema = db.Schema
  , ObjectId=Schema.ObjectId;
_ = require('../libs/underscore.js');
var Leaderboard = require('../models/leaderboard.js');
//var patchAttrs = ['firstname', 'surname', 'birthdate', 'gender', 'picture_url', 'facebook_id', 'email'];
LeaderboardController = function() {};


exports.getLeaderboard = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*"); 
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
  	Leaderboard.aggregate({$group: {_id: '$user', points: {$sum: '$totalPoints'}}}, {$sort:{points:-1}}
  	, function(err, docs){
		if (err) res.send(500, 'Error #400: '+err);
		else {
			console.log("sending leader", docs);
			res.send(docs);
		}
  	});
}

exports.getLeaderboardVenue = function(req, res) {
		res.header("Access-Control-Allow-Origin", "*"); 
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
  	var _id = req.params._id;
  	Leaderboard.aggregate({$match: {"venue":db.Types.ObjectId(_id)}}, {$group: {_id: '$user', points: {$sum: '$totalPoints'}}}, {$sort:{points:-1}}
  	, function(err, docs){
		if (err) res.send(500, 'Error #400: '+err);
		else {
			console.log("sending leadervenue", docs);
			res.send(docs);
		}
  	});
}

exports.LeaderboardController = LeaderboardController;

