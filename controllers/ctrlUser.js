/*TODO validazione
- aggiundere la risposta in POST nell'header 'Location' e codice 201
- 
*/
var _ = require('../libs/underscore')._;
var User = require('../models/user.js');
UserController = function(){};

exports.getUsers =function(req, res) {
	User.find({}, function (err, docs) {
			if(!err){
				res.send(docs);
			} else res.send(err);
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
		} else res.send(err);
	});
}
exports.delUsers=function (req,res) {
	User.remove({}, function  (err) {
		if(!err){
			res.send(req.url);
		} else res.send(err);
	});
}


exports.getUser = function(req, res) {
	_id=req.params._id;
	User.findOne({_id:_id}, function (err, doc) {
		if(!err){
			res.send(doc);
		} else res.send(404, req.url+" not found");
	});	
}

exports.putUser=function (req, res) {
	var myparams=['name',
		'surname',
		'bithdate',
		'gender',
		'picture_url',
		'facebook_id',
		'email'];

	console.log('start');
if(checkParams(myparams, req)){
	console.log('params ok');
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
		} else res.send(404, req.url+" not found");
		
	});	
	} else {
		console.log('params not ok');
		res.send(400, 'Required parameter missing');
	}
}

exports.delUser=function (req, res) {
	_id=req.params._id;
	User.remove({_id:_id}, function (err, doc) {
		if(!err){
			res.send(req.url.substring(0, req.url.length-_id.length-1));	
		} else res.send(404, req.url+" not found");
	});	
}


exports.UserController=UserController;

function checkParams (params, req) {
	console.log('checking');
	for (var i = 0 ; i < params.length; i++) {
		console.log(i);
		if(!(_.include(req.params, params[i]))){
			console.log('false');
			return false;
			}

		}

		if (req.body.params.length>1) return true;
		else return false;
}
