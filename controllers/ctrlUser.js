//TODO: aggiundere la risposta in POST nell'header 'Location' e codice 201
_ = require('../libs/underscore.js');
var User = require('../models/user.js');
var user_params = ['surname', 'firstname', 'birthdate', 'gender', 'picture_url', 'facebook_id', 'email', 'city'];
UserController = function() {};

//using populate to get the checkins and patches along with the user(s)
exports.getUsers = function(req, res) {
	var usr = createUserFromParams(req);
	console.log(usr);
	User.find(usr).run(function(err, users) {
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
		city:req.params.city
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
	}).populate('patches.patch').populate('checkins.event').run(function(err, doc) {
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
				city:req.params.city
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
	User.findOne({
		_id: _id
	}, function(err, user) {
		if (!err) {
			user.checkins.push({
				timestamp: new Date(),
				event: req.params.event
			});
			user.save(function(err) {
				if (!err) {
					res.send('users/' + user._id);
				} else {
					res.send(err);
				}
			});
		} else {
			res.send(404, req.url + 'not found');
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
	console.log("entrato" + _id);
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
		} else res.send(404, req.url + " not found");
	});

}



exports.UserController = UserController;

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