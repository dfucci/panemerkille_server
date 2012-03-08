var User = require('../models/user.js');
UserController = function(){};

UserController.prototype.getUsers =function() {
	console.log('Get users');
	var users=Array();
	User.find({}, function (err, docs) {
   		docs.forEach(function(user) {
			users.push(user);
		});
		console.log(users);
		
	});
	//asyncronous :(
	return users;
}

UserController.prototype.getUser =function(id) {
	// body...
}

UserController.prototype.postUser =function(user) {
	user.save();
}

UserController.prototype.deleteUser=function (id) {
	// body...
}

UserController.prototype.putUser=function (user) {
 	
}

exports.UserController=UserController;
