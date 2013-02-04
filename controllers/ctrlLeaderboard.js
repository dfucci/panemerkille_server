//error code 4xx
var db = require('mongoose'),
	Schema = db.Schema,
	ObjectId = Schema.ObjectId;
_ = require('../libs/underscore.js');
var Leaderboard = require('../models/leaderboard.js');
var User = require('../models/user.js');
var Venue = require('../models/venue.js');
//var patchAttrs = ['firstname', 'surname', 'birthdate', 'gender', 'picture_url', 'facebook_id', 'email'];
LeaderboardController = function() {};


exports.getLeaderboard = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	Leaderboard.aggregate({
		$group: {
			_id: '$user',
			points: {
				$sum: '$totalPoints'
			}
		}
	}, {
		$sort: {
			points: -1
		}
	}, function(err, leaderboard) {
		if(err) res.send(500, 'Error #400: ' + err);
		else {
			User.find({},'picture_url name', function(err, users){
				if(err) res.send(500, "Error 401: " + err)
				else{
					for (var i = 0; i < leaderboard.length; i++) {
						var tempUserid = leaderboard[i]._id;
						var user = _.find(users, function(us){
							return us._id.toString().toLowerCase()==tempUserid.toString().toLowerCase();
						});
						leaderboard[i].user=user;
					}
				res.send(leaderboard);
				}
			});
		}
	});
}

exports.getLeaderboardVenue = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var _id = req.params._id.toLowerCase();
	Leaderboard.aggregate({
		$match: {
			"venue": db.Types.ObjectId(_id)
		}
	}, {
		$group: {
			_id: '$user',
			points: {
				$sum: '$totalPoints'
			}
		}
	}, {
		$sort: {
			points: -1
		}
	}, function(err, leaderboard) {
		if(err) res.send(500, 'Error #402: ' + err);
		else {
			User.find({},'picture_url name', function(err, users){
				if(err) res.send(500, "Error 401: " + err)
				else{
					for (var i = 0; i < leaderboard.length; i++) {
						var tempUserid = leaderboard[i]._id;
						var user = _.find(users, function(us){
							return us._id.toString().toLowerCase()==tempUserid.toString().toLowerCase();
						});
						leaderboard[i].user=user;
					}
				res.send(leaderboard);
				}
			});
		}
	});
}

exports.LeaderboardController = LeaderboardController;