//TODO: aggiundere la risposta in POST nell'header 'Location' e codice 201
_ = require('../libs/underscore.js');
var User = require('../models/user.js');
var user_params = ['surname', 'firstname', 'birthdate', 'gender', 'picture_url', 'facebook_id', 'email'];
UserController = function() {};


exports.getUsers = function(req, res) {
	var usr = createUserFromParams(req); 
	User.find(usr, function(err, docs) {
		if (!err) {
			res.send(docs);
		} else res.send(err);
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
		email: req.params.email
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
	}, function(err, doc) {
		if (!err) {
			res.send(doc);
		} else res.send(404, req.url + " not found");
	});
}

exports.putUser = function(req, res) {
	if (paramsMissing(req)) {

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
				email: req.params.email
			}
		}, {
			upsert: true
		}, function(err) {
			if (!err) {
				console.log("user updated");
				res.send(req.url);
			} else {
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

	var checkin = new Checkin({
		event: req.params.event,
		user: req.params._id
	});
	user.checkins.push(checkin);
	user.save(function(err) {
		if (!err) {
			checkin.save(function(err) {
				if (!err) {
					res.send('/users/' + user._id);
				} else {
					res.send(err);
				}
			});
		} else {
			res.send(err);

		}
	});
}

exports.postUserPatches = function(req, res) {
	_id = req.params._id;
	console.log("entrato" + _id);
	User.findOne({
		_id: _id
	}, function(err, user) {
		if (!err) {
			user.patches.push({
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

function paramsMissing(req) {
	// Make sure each param listed in arr is present in req.query
	var missing = false;
	_.each(user_params, function(param) {
		if (_.isUndefined(req.params[param] || _.isNull(req.params[param]))) {
			missing = true;
		}
	});
	return missing;
}

function createUserFromParams(req) {
	var myuser = {
		name: {}
	};
	_.each(req.query, function(val, key) {
		if (!_.isUndefined(val) && !_.isNull(val) && _.include(user_params, key)) {
			if (key == 'firstname') {
				myuser.name.firstname = val;
			} else if (key == 'surname') {
				myuser.name.surname = val;
			} else {
				myuser[key] = val;
			}
		}
	});
	return myuser;
}