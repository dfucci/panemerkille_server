/*TODO validazione
- aggiundere la risposta in POST nell'header 'Location' e codice 201
- 
*/

//Error codes: 2xx


_ = require('../libs/underscore.js');
var Patch = require('../models/patch.js');
//var patchAttrs = ['firstname', 'surname', 'birthdate', 'gender', 'picture_url', 'facebook_id', 'email'];
PatchController = function() {};


exports.getPatches = function(req, res) {
	Patch.find(req.query, function(err, docs) {
		if (err)
			res.send(500, 'Error #201: '+err);
		else 
			res.send(docs);
	});
}

exports.postPatches = function(req, res) {
	
	var patch = new Patch({
		name:req.params.name,
		image_url:req.params.image_url,
		description:req.params.description,
		unlock_function:req.params.unlock_function
	});

	patch.save(function(err) {
		if (err) 
			res.send(500, 'Error #202: '+err);
		else
			res.send('/patches/' + patch._id);
	});
}

exports.delPatches = function(req, res) {
	Patch.remove({}, function(err) {
		if (err) 
			res.send(500, 'Error #203: '+err);
		else
			res.send(req.url);

	});
}


exports.getPatch = function(req, res) {
	_id = req.params._id;
	Patch.findOne({
		_id: _id
	}, function(err, doc) {
		if (err) 
			res.send(500, 'Error #204: '+err);
		else if (doc == null)
			res.send (404, "The requested patch has not been found");
		else 
			res.send(doc);
	});
}

exports.putPatch = function(req, res) {
	var myparams = ['name', 'description', 'image_url', 'unlock_function'];
	if (checkParams(myparams, req)) {
		Patch.update({_id: req.params._id}, 
			{
			$set: {
				name:req.params.name,
				description:req.params.description,
				image_url:req.params.image_url,
				unlock_function:req.params.unlock_function
			}
		}, {upsert: true}, 
		function(err) {
			if (!err) {
				res.send(req.url);
			} else {
				res.send(500, 'Error #205: '+err);
			}

		});
	} else {
		
		res.send(400, 'Required parameter missing');
	}
}

exports.delPatch = function(req, res) {
	_id = req.params._id;
	Patch.remove({
		_id: _id
	}, function(err, doc) {
		if (!err) {
			res.send('/patches/');
		} else res.send(500, 'Error #206: '+err);
	});
}




exports.PatchController = PatchController;

function checkParams(arr, req) {
	
	// Make sure each param listed in arr is present in req.query
	var missing_params = [];
	for (var i = 0; i < arr.length; i++) {
		if (typeof eval("req.params." + arr[i]) == "undefined") {
			missing_params.push(arr[i]);
		}
	}
	if (missing_params.length == 0) {
		
		return true;
	} else {
		
		return false;
	}
}
