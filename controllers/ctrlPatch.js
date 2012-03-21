/*TODO validazione
- aggiundere la risposta in POST nell'header 'Location' e codice 201
- 
*/
_ = require('../libs/underscore.js');
var Patch = require('../models/patch.js');
//var patchAttrs = ['firstname', 'surname', 'birthdate', 'gender', 'picture_url', 'facebook_id', 'email'];
PatchController = function() {};


exports.getPatches = function(req, res) {
	Patch.find(req.query, function(err, docs) {
		if (!err) {
			res.send(docs);
		} else res.send(err);
	});
}

exports.postPatches = function(req, res) {
	
	var patch = new Patch({
		name:req.params.name,
		image_url:req.params.image_url,
		description:req.params.description
	});

	patch.save(function(err) {
		if (!err) {
			res.send(req.url + '/' + patch._id);
		} else res.send(err);
	});
}

exports.delPatches = function(req, res) {
	Patch.remove({}, function(err) {
		if (!err) {
			res.send(req.url);
		} else res.send(err);
	});
}


exports.getPatch = function(req, res) {
	_id = req.params._id;
	Patch.findOne({
		_id: _id
	}, function(err, doc) {
		if (!err) {
			res.send(doc);
		} else res.send(404, req.url + " not found");
	});
}

exports.putPatch = function(req, res) {
	var myparams = ['name', 'description', 'image_url'];
	if (checkParams(myparams, req)) {
		Patch.update({_id: req.params._id}, 
			{
			$set: {
				name:req.params.name,
				description:req.params.description,
				image_url:req.params.image_url
			}
		}, {upsert: true}, 
		function(err) {
			if (!err) {
				console.log("patch updated");
				res.send(req.url);
			} else {
				console.log("Error updating patch");
				res.send(404, req.url + " not found");
			}

		});
	} else {
		console.log('params not ok');
		res.send(400, 'Required parameter missing');
	}
}

exports.delPatch = function(req, res) {
	_id = req.params._id;
	Patch.remove({
		_id: _id
	}, function(err, doc) {
		if (!err) {
			res.send(req.url.substring(0, req.url.length - _id.length - 1));
		} else res.send(404, req.url + " not found");
	});
}

// exports.postPatchCheckins = function(req, res) {

// 	var checkin = new Checkin({
// 		event: req.params.event,
// 		patch: req.params._id
// 	});
// 	patch.checkins.push(checkin);
// 	patch.save(function(err) {
// 		if (!err) {
// 			checkin.save(function(err) {
// 				if (!err) {
// 					res.send('/patchs/' + patch._id);
// 				} else {
// 					res.send(err);
// 				}
// 			});
// 		} else {
// 			res.send(err);

// 		}
// 	});
// }

// exports.postPatchPatches = function(req, res) {
// 	_id = req.params._id;
// 	console.log("entrato" + _id);
// 	Patch.findOne({
// 		_id: _id
// 	}, function(err, patch) {
// 		if (!err) {
// 			patch.patches.push({patch:req.params.patch, timestamp: new Date()});
// 			patch.save(function(err) {
// 				if (!err) {
// 					//patch.save(function(err) {
// 					res.send('patchs/' + patch._id);
// 				} else {
// 					res.send(err);

// 				}
// 			});
// 		} else res.send(404, req.url + " not found");
// 	});

// }

// exports.delPatchPatches = function(req, res) {
// 	_id = req.params._id;
// 	console.log("entrato" + _id);
// 	Patch.findOne({
// 		_id: _id
// 	}, function(err, patch) {
// 		if (!err) {
// 			patch.patches=[];
// 			patch.save(function(err) {
// 				if (!err) {
// 					//patch.save(function(err) {
// 					res.send('/patchs/' + patch._id);
// 				} else {
// 					res.send(err);

// 				}
// 			});
// 		} else res.send(404, req.url + " not found");
// 	});

// }



exports.PatchController = PatchController;

function checkParams(arr, req) {
	console.log("Checking");
	// Make sure each param listed in arr is present in req.query
	var missing_params = [];
	for (var i = 0; i < arr.length; i++) {
		if (typeof eval("req.params." + arr[i]) == "undefined") {
			missing_params.push(arr[i]);
		}
	}
	if (missing_params.length == 0) {
		console.log("No missing param");
		return true;
	} else {
		console.log("Missing params");
		console.log(missing_params[0]);
		return false;
	}
}