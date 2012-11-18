//TODO: aggiundere la risposta in POST nell'header 'Location' e codice 201
//Error codes: 0xx
//Last err: 025
_ = require('../libs/underscore.js');

var User = require('../models/user.js');
var Patch = require('../models/patch.js');
var Event = require('../models/event.js');

var user_params = ['surname', 'firstname', 'birthdate', 'gender', 'picture_url', 'facebook_id', 'email', 'city'];
var patchUnlocker = require('../controllers/patchUnlocker.js').patchUnlocker;
UserController = function() {};

//using populate to get the checkins and patches along with the user(s)
exports.getUsers = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var usr = createUserFromParams(req);
	User.find(usr, '_id birthdate gender name email registered').exec(function(err, users) {
		if(!err) {
			res.send(users);
		} else {
			res.send(500, 'Error #005: ' + err);
		}
	});
}

exports.postUsers = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
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
		city: req.params.city,
		registered: new Date()
	});

	user.save(function(err) {
		if(!err) {
			res.send(req.url + '/' + user._id);
			console.log("Event: new user");
		} else res.send(500, 'Error #006: ' + err);
	});
}

exports.delUsers = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	User.remove({}, function(err) {
		if(!err) {
			res.send(req.url);
		} else res.send(500, 'Error #007: ' + err);
	});
}



exports.getUser = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	_id = req.params._id;
	User.findOne({
		_id: _id
	}, '_id name picture_url patches checkins friends').populate('patches.patch', '_id claimed name image_url').populate('checkins.event', '_id name venue poster_url').exec(function(err, doc) {
		if(err) res.send(500, 'Error #008: ' + err);
		else if(doc == null) res.send(404, 'The requested user has not been found');
		else {
			res.send(doc);
			for(var i = 0; i < doc.patches.length; i++) {
				if(!doc.patches[i].seen) doc.patches[i].seen = true;
			}
			doc.save();
		}
	});
}

exports.putUser = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	if(paramsOK(req)) {
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
			if(!err) {
				res.send(req.url);
			} else {
				res.send(500, 'Error #009: ' + err);
			}

		});
	} else {

		res.send(400, 'Required parameter missing');
	}
}

exports.delUser = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	_id = req.params._id;
	User.remove({
		_id: _id
	}, function(err, doc) {
		if(!err) {
			res.send("/users/");
		} else res.send(500, 'Error #010: ' + err);
	});
}


exports.postUserCheckins = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	_id = req.params._id;
	Event.findOne({
		_id: req.params.event
	}, function(err, event) {
		if(err) res.send(500, 'Error #001: ' + err);
		else if(event == null) res.send(404, 'Event not found');
		else {
			User.findOne({
				_id: _id
			}).populate('checkins.event').exec(function(err, user) { //TODO: da rimuovere?
				if(!err) {
					if(user == null) res.send(404, 'User not found');
					else {
						user.checkins.push({
							timestamp: new Date(),
							event: req.params.event
						});
						event.attenders.push({
							attender: user._id
						});

						user.save(function(err) {
							if(!err) {
								console.log("Event: Checkin");
								Patch.find({}, function(err, patches) {
									var diff = new Array();
									if(err) {} else {
										for(var i = 0; i < patches.length; i++) {
											filterPatch(patches[i], diff);
										}

										User.findOne({
											_id: user._id
										}).populate('checkins.event').exec(function(err, user) {
											if(err) {} else {
												_.each(diff, function(p) {

													patchUnlocker[p.unlock_function](user, p._id);
												});

											}
										});

									}
								});

								function filterPatch(patch, diff) {
									var found = false;
									for(var i = 0; i < user.patches.length; i++) {
										if(patch._id.equals(user.patches[i].patch)) {
											found = true;

										}
									}
									if(!found) {
										diff.push(patch);
									}
								}
								event.save(function(err) {
									if(err) res.send(500, 'Error #002: ' + err);
									else res.send('users/' + user._id);
								})
							} else {
								res.send(500, 'Error #003: ' + err);
							}
						});
					}
				} else {
					res.send(500, 'Error #004: ' + err);
				}
			});
		}
	});
}
exports.postUserPatches = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	_id = req.params._id;
	User.findOne({
		_id: _id
	}, function(err, user) {
		if(!err) {
			user.patches.push({
				claimed: req.params.claimed,
				patch: req.params.patch,
				timestamp: new Date()
			});
			user.save(function(err) {
				if(!err) {
					//patch.save(function(err) {
					res.send('users/' + user._id);
				} else {
					res.send(500, 'Error #011: ' + err);

				}
			});
		} else res.send(500, 'Error #012: ' + err);
	});

}

exports.delUserPatches = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	_id = req.params._id;
	User.findOne({
		_id: _id
	}, function(err, user) {
		if(!err) {
			user.patches = [];
			user.save(function(err) {
				if(!err) {
					//patch.save(function(err) {
					res.send('/users/' + user._id);
				} else {
					res.send(500, 'Error #013: ' + err);

				}
			});
		} else res.send(500, 'Error #014: ' + err);
	});

}

exports.getUserFriends = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var _id = req.params._id;
	var count = 0;
	var output = new Array();
	User.findOne({
		_id: _id
	}, '_id friends', function(err, user) {
		if(user.friends.length == 0) res.send(output);
		else {
			for(var i = 0; i < user.friends.length; i++) {
				User.findOne({
					_id: user.friends[i].friend
				}, '_id picture_url checkins name').where('checkins').slice(-1).populate('checkins.event', '_id poster_url name').exec(function(err, friend) {
					if(err) {
						console.log('Error #015: ' + err);
						count++;
					} else if(friend == null) {
						console.log('Error #025: Database inconsistency');
						count++;
					} else if(friend.checkins.length > 0) {
						output.push(friend);
						count++;
					}
					else count++;
						if(count == user.friends.length) {
							res.send(output.sort(compare).reverse());
						}
				});
			}
		}

	});

}


exports.postUserFriends = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var _id = req.params._id;
	User.update({ // aggiorno l'utente corrente
		_id: _id
	}, {
		$unset: { // piallo via l'array degli amici e lo sostituisco con il nuovo
			friends: 1
		}
	}, function(err, number) {
		if(err) console.log('Error #016: ' + err);
		else {
			var friends = JSON.parse(req.params.friends);
			User.findOne({ // mi prendo l'utente corrente
				_id: _id
			}, function(err, user) {
				if(err) console.log('Error #017: ' + err);
				else {

					if(friends.length == 0) {
						res.send(200, '/user/' + _id);
						console.log('user: ' + _id + 'friends empty');
					} else {
						for(var i = 0; i < friends.length; i++) { // ciclo su gli amici dell'utente corrente
							User.findOne({
								facebook_id: friends[i].id
							}, function(err, friend) {
								if(err) console.log('Error #018: ' + err);
								else if(friend == null) console.log('Error #018b: Friend not found');
								else {
									user.friends.push({ // aggiungo all'array degli amici se trovo un amico
										friend: friend._id
									});
									user.save(function(err) { // salvo l'utente corrente con il nuovo array di amici 
										if(err) console.log('Error #019: ' + err);

									});
								}
							});
							if(i == friends.length - 1) {
								res.send(200, '/user/' + _id);
								console.log('user: ' + _id + 'friends updated');
							}
						}


					}
				}
			});

		}
	});
}
exports.postUserPatch = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var user_id = req.params.u_id;
	var patch_id = req.params.p_id;
	if(!(req.params.claimed === 'true' || req.params.claimed === 'false')) res.send(400, "Error #021: Wrong parameter value"); //controlla che sia una stringa contenente un booleano
	else {
		var query = {
			_id: user_id
		};
		User.findOne({
			_id: user_id
		}, function(err, user) {
			if(err) res.send(500, 'Error #020: ' + err);
			else {
				var found = false; // necessario controllare se la patch esiste 
				_.each(user.patches, function(patch) {
					if(patch.patch == patch_id) {
						patch.claimed = JSON.parse(req.params.claimed); // è passata come stringa, ogni stringa non vuota è TRUE
						found = true;
					}
				});
				if(!found) res.send(404, 'Error #022: Cannot find requested patch');
				User.update({
					_id: user_id
				}, {
					patches: user.patches
				}, function(err, num) {
					if(err) res.send(500, 'Error #023: ' + err);
					else res.send('/users/' + user_id);
				});
			}
		});
	}
}
exports.UserController = UserController;

function compare(a, b) {
	if(a.checkins[0].timestamp < b.checkins[0].timestamp) return -1;
	if(a.checkins[0].timestamp > b.checkins[0].timestamp) return 1;
	return 0;
}

function paramsOK(req) {
	return _.all(user_params, function(param) { //returns true if all pass the condition
		return(!_.isUndefined(req.params[param]) || !_.isNull(req.params[param]));
	});
}


function createUserName(req) { //porcata micidiale
	if(!_.isUndefined(req.params.firstname) && !_.isUndefined(req.params.surname)) {
		myuser = {
			'name.firstname': req.params.firstname,
			'name.surname': req.params.surname
		};
		return myuser;
	} else if(!_.isUndefined(req.params.firstname) && _.isUndefined(req.params.surname)) {
		myuser = {
			'name.firstname': req.params.firstname
		};
		return myuser;
	} else if(_.isUndefined(req.params.firstname) && !_.isUndefined(req.params.surname)) {
		myuser = {
			'name.surname': req.params.surname
		};
		return myuser;
	} else if(_.isUndefined(req.params.firstname) && _.isUndefined(req.params.surname)) {
		myuser = {};
		return myuser;
	}
}


function createUserFromParams(req) {
	var myuser = createUserName(req);
	_.each(req.query, function(val, key) {
		if(!_.isUndefined(val) && !_.isNull(val) && _.include(user_params, key) && (key != 'firstname') && (key != 'surname')) {
			myuser[key] = val;
		}
	});
	return myuser;
}