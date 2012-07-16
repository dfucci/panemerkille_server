//TODO: aggiundere la risposta in POST nell'header 'Location' e codice 201
_ = require('../libs/underscore.js');

var User = require('../models/user.js');
var Event = require('../models/event.js');
var user_params = ['surname', 'firstname', 'birthdate', 'gender', 'picture_url', 'facebook_id', 'email', 'city'];
UserController = function() {};

//using populate to get the checkins and patches along with the user(s)
exports.getUsers = function(req, res) {
	var usr = createUserFromParams(req);
	console.log(usr);
	User.find(usr).exec(function(err, users) {
		if (!err) {
			console.log(users);
			res.send(users);
		} else {
			res.send(err);
		}
	});
}

exports.postUsers = function(req, res) {
	var name = {
		firstname: req.params.firstname,
		surname: req.params.surname
	};
	var user = new User({
		name: name,
		birthdate: req.params.birthdate,
		gender: req.params.gender,
		picture_url: req.params.picture_url,
		facebook_id: req.params.facebook_id,
		email: req.params.email,
		city: req.params.city
	});

	user.save(function(err) {
		if (!err) {
			res.send(req.url + '/' + user._id);
		} else res.send(err);
	});
}

exports.delUsers = function(req, res) {
	User.remove({}, function(err) {
		if (!err) {
			res.send(req.url);
		} else res.send(err);
	});
}


exports.getUser = function(req, res) {
	_id = req.params._id;
	User.findOne({
		_id: _id
	}).populate('patches.patch').populate('checkins.event').exec(function(err, doc) {
		if (!err) {
			res.send(doc);
		} else res.send(404, req.url + " not found");
	});
}

exports.putUser = function(req, res) {
	if (paramsOK(req)) {
		var name = {
			firstname: req.params.firstname,
			surname: req.params.surname
		};
		User.update({
			_id: req.params._id
		}, {
			$set: {
				name: name,
				birthdate: req.params.birthdate,
				gender: req.params.gender,
				picture_url: req.params.picture_url,
				facebook_id: req.params.facebook_id,
				email: req.params.email,
				city: req.params.city
			}
		}, {
			upsert: true
		}, function(err) {
			if (!err) {
				console.log("user updated");
				res.send(req.url);
			} else {
				console.log(err);
				console.log("Error updating user");
				res.send(404, req.url + " not found");
			}

		});
	} else {
		console.log('params not ok');
		res.send(400, 'Required parameter missing');
	}
}

exports.delUser = function(req, res) {
	_id = req.params._id;
	User.remove({
		_id: _id
	}, function(err, doc) {
		if (!err) {
			res.send(req.url.substring(0, req.url.length - _id.length - 1));
		} else res.send(404, req.url + " not found");
	});
}

exports.postUserCheckins = function(req, res) {
	_id = req.params._id;
	Event.findOne({
		_id: req.params.event
	}, function(err, event) {
		if (err) res.send(500, 'Error #001: '+err);
		else if (event == null) res.send(404, 'Event not found');
		else {
			User.findOne({
				_id: _id
			}, function(err, user) {
				if (!err) {
					if (user == null) res.send(404, 'User not found');
					else {
						user.checkins.push({
							timestamp: new Date(),
							event: req.params.event
						});
						event.attenders.push({attender:user._id});
						console.log(event.attenders);
						user.save(function(err) {
							if (!err) {
								console.log('event:'+event);
								event.save(function(err) {
									if (err) res.send(500, 'Error #002: ' +err);
									else res.send('users/' + user._id);
								})
							} else {
								res.send(500, 'Error #003: '+err);
							}
						});
					}
				} else {
					res.send(500, 'Error #004: '+err);
				}
			});
		}
	});
}

exports.postUserPatches = function(req, res) {
	_id = req.params._id;
	User.findOne({
		_id: _id
	}, function(err, user) {
		if (!err) {
			user.patches.push({
				claimed: req.params.claimed,
				patch: req.params.patch,
				timestamp: new Date()
			});
			user.save(function(err) {
				if (!err) {
					//patch.save(function(err) {
					res.send('users/' + user._id);
				} else {
					res.send(err);

				}
			});
		} else res.send(404, req.url + " not found");
	});

}

exports.delUserPatches = function(req, res) {
	_id = req.params._id;
	User.findOne({
		_id: _id
	}, function(err, user) {
		if (!err) {
			user.patches = [];
			user.save(function(err) {
				if (!err) {
					//patch.save(function(err) {
					res.send('/users/' + user._id);
				} else {
					res.send(err);

				}
			});
		} else res.send(500, err);
	});

}

exports.getUserFriends = function(req, res) {
	var _id = req.params._id;
	var count = 0;
	var output = new Array();
	User.findOne({
		_id: _id
	}, function(err, user) {
		for (var i = 0; i < user.friends.length; i++) {
			console.log(user.friends[i].friend);
			User.findOne({
				_id: user.friends[i].friend
			}).where('checkins').slice(-1).populate('checkins.event').exec(function(err, friend) {
				if (err) res.send(500, err);
				else {
					if (friend.checkins.length>0) output.push(friend);
					count++;
					if (count == user.friends.length) {
						res.send(output.sort(compare).reverse());
					}
				}
			});
		}

	});

}


//TODO: alert che scoppia
exports.postUserFriends = function(req, res) {
	var _id = req.params._id;
	User.update({ // aggiorno l'utente corrente
		_id: _id
	}, {
		$unset: { // piallo via l'array degli amici e lo sostituisco con il nuovo
			friends: 1
		}
	}, function(err, number) {
		if (err) res.send('1' + err);
		else {
			console.log(number);
			var friends = JSON.parse(req.params.friends); 
			console.log('I tuoi amici sono ' + friends.length);
			User.findOne({ // mi prendo l'utente corrente
				_id: _id
			}, function(err, user) {
				if (err) res.send(500, '2' + err);
				else {
					var count = 0;
					for (var i = 0; i < friends.length; i++) { // ciclo su gli amici dell'utente corrente
						User.findOne({ 
							facebook_id: friends[i].id
						}, function(err, friend) {
							if (err) res.send(500, '3' + err);
							else {
								user.friends.push({ // aggiungo all'array degli amici se trovo un amico
									friend: friend._id
								});
								user.save(function(err) { // salvo l'utente corrente con il nuovo array di amici 
									if (err) res.send('4' + err);
									else {
										count++;
										if (count == friends.length) {
											res.send('/users/' + _id);
										}
									}
								});
							}
						});
					}
				}
			});

		}
	});
}
exports.putUserPatch = function(req, res){
	var user_id = req.params.u_id;
	var patch_id = req.params.p_id;
	var query = {_id:user_id};
	console.log('putUserPatch');
	User.findOne({_id:user_id}, function(err, user){
		if (err) res.send(500, 'Error #020: '+err);
		else {	
		_.each(user.patches, function(patch){
			console.log(patch);
			if (patch.id==patch_id) {
				console.log('trovato');
				console.log(req.params.claimed);
				patch.claimed=JSON.parse(req.params.claimed); // è passata come stringa, ogni stringa non vuota è TRUE
				console.log(patch.claimed);
			}
 		});
 		User.update({_id:user_id}, {patches:user.patches}, function(err, num){
 			if(err) res.send(500,'Error #021: '+err);
 			else res.send('/users/' + user_id);
 		});
		}
	});
}
exports.UserController = UserController;

function compare(a,b){
	if (a.checkins[0].timestamp<b.checkins[0].timestamp) return -1;
	if (a.checkins[0].timestamp>b.checkins[0].timestamp) return 1;
	return 0;
}

function paramsOK(req) {
	return _.all(user_params, function(param) { //returns true if all pass the condition
		return (!_.isUndefined(req.params[param]) || !_.isNull(req.params[param]));
	});
}

function createUserName(req) { //porcata micidiale
	if (!_.isUndefined(req.params.firstname) && !_.isUndefined(req.params.surname)) {
		myuser = {
			'name.firstname': req.params.firstname,
			'name.surname': req.params.surname
		};
		return myuser;
	} else if (!_.isUndefined(req.params.firstname) && _.isUndefined(req.params.surname)) {
		myuser = {
			'name.firstname': req.params.firstname
		};
		return myuser;
	} else if (_.isUndefined(req.params.firstname) && !_.isUndefined(req.params.surname)) {
		myuser = {
			'name.surname': req.params.surname
		};
		return myuser;
	} else if (_.isUndefined(req.params.firstname) && _.isUndefined(req.params.surname)) {
		myuser = {};
		return myuser;
	}
}


function createUserFromParams(req) {
	var myuser = createUserName(req);
	_.each(req.query, function(val, key) {
		if (!_.isUndefined(val) && !_.isNull(val) && _.include(user_params, key) && (key != 'firstname') && (key != 'surname')) {
			myuser[key] = val;
		}
	});
	return myuser;
}