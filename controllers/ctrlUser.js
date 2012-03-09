var User = require('../models/user.js');
UserController = function(){};

exports.getUsers =function(req, res) {
	User.find({}, function (err, docs) {
			if(!err){
				res.send(docs);
			}
		});	
	}


exports.postUsers =function(req, res) {
var user = new User({
		name : req.body.name,
		surname:req.body.surname,
		bithdate:req.body.birthdate,
		gender:req.body.gender,
		picture_url:req.body.picture_url,
		facebook_id:req.body.facebook_id,
		email:req.body.email
	});
	user.save(function(err) {
		if(!err){
			res.send(req.url+'/'+user._id);
		}
	});
}
exports.delUsers=function (req,res) {
	User.remove({}, function  (err) {
		if(!err){
			res.send(req.url);
		}
	});
}


exports.getUser = function(req, res) {
	_id=req.params._id;
	User.findOne({_id:_id}, function (err, doc) {
		if(!err){
			res.send(doc);
		}
	});	
}

exports.putUser=function (req, res) {
 	_id=req.params._id;
	User.update({_id:_id}, {$set:{
		name : req.body.name,
		surname:req.body.surname,
		bithdate:req.body.birthdate,
		gender:req.body.gender,
		picture_url:req.body.picture_url,
		facebook_id:req.body.facebook_id,
		email:req.body.email
	}}, {upsert: true},function  (err) {
		if (!err){
			res.send(req.url);
		}
		
	});	

}

exports.delUser=function (req, res) {
	_id=req.params._id;
	User.remove({_id:_id}, function (err, doc) {
		if(!err){
			res.send(req.url.substring(0, req.url.length-_id.length-1));	
		}	
	});	
}

exports.UserController=UserController;
