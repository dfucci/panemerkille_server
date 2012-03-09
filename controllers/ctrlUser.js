var User = require('../models/user.js');
UserController = function(){};

exports.getUsers =function(req, res) {
	User.find({}, function (err, docs) {
			res.send(docs);
		});	
	}

exports.getUser = function(req, res) {
	_id=req.params._id;
	User.find({_id:_id}, function (err, docs) {
			res.send(docs);
		});	
}

exports.postUser =function(req, res) {
var user = new User({
		name : req.body.name,
		surname:req.body.surname,
		bithdate:req.body.birthdate,
		gender:req.body.gender,
		picture_url:req.body.picture_url,
		facebook_id:req.body.facebook_id,
		email:req.body.email
	});
	user.save();
	res.send(user);
}

UserController.prototype.deleteUser=function (id) {
	// body...
}

UserController.prototype.putUser=function (user) {
 	
}

exports.UserController=UserController;
