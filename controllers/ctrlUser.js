//require('../models/user.js');
UserController = function(){};

UserController.prototype.getUsers =function() {
	console.log('Get users');
	return users = db.user.find();

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