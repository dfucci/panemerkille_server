/*TODO validazione
- aggiundere la risposta in POST nell'header 'Location' e codice 201
- 
*/
_=require('../libs/underscore.js');
var User = require('../models/user.js');
var userAttrs = ['name', 'surname', 'birthdate', 'gender', 'picture_url', 'facebook_id', 'email'];
UserController = function(){};

exports.getUsers =function(req, res) {
	//TODO: caso in cui ci sono solo parametri dummy
	
	 var myuser = {};
	// _.each(req.query,function  (v,k) {
	// 	if(_.include(userAttrs, k))	{
	// 		if(!(_.isNull(v) || _.isUndefined(v) || v=='') ){
	// 			myuser[k]=v;
	// 		}
	// 	}
	// });
	console.log(req.query); 
	User.find(req.query, function (err, docs) {
			if(!err){
				res.send(docs);
			} else res.send(err);
		});	
	}


exports.postUsers =function(req, res) {
var user = new User({
		name : req.params.name,
		surname:req.params.surname,
		birthdate:req.params.birthdate,
		gender:req.params.gender,
		picture_url:req.params.picture_url,
		facebook_id:req.params.facebook_id,
		email:req.params.email
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
		'birthdate',
		'gender',
		'picture_url',
		'facebook_id',
		'email'];

	console.log('start: ' + req.params.name);
	if(checkParams(myparams, req)){
	console.log("Uploading user");
		User.update({_id:_id}, {$set:{
			name : req.params.name,
			surname:req.params.surname,
			birthdate:req.params.birthdate,
			gender:req.params.gender,
			picture_url:req.params.picture_url,
			facebook_id:req.params.facebook_id,
			email:req.params.email
	}}, {upsert: true},function  (err) {
		if (!err){
			console.log("user updated");
			res.send(req.url);
		} else {
			console.log("Error updating user");
			res.send(404, req.url+" not found");
		}
		
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


function checkParams(arr, req){
  console.log("Checking");
    // Make sure each param listed in arr is present in req.query
    var missing_params = [];
    for(var i=0;i<arr.length;i++){
        if(typeof eval("req.params." + arr[i]) == "undefined"){
        missing_params.push(arr[i]);
      }
    }
    if(missing_params.length == 0){
      console.log("No missing param");
      return true;
    } else {
      console.log("Missing params");
      console.log(missing_params[0]);
      return false;
    }
}