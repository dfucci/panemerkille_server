//TODO: aggiundere la risposta in POST nell'header 'Location' e codice 201
_ = require('../libs/underscore.js');
var Event = require('../models/event.js');
var Venue = require('../models/venue.js');
var event_params = ['name', 'start', 'end', 'description', 'poster_url', 'facebook_url'];
EventController = function() {};


exports.getEvents = function(req, res) {
	//var ev = createEventFromParams(req); 
	var start= new Date();
	var end = new Date();
	end.setDate(end.getDate()+7);
	
	
	var ev = {name: "Pink Party", facebook_url: "http"};
	console.log(ev);
	Venue.find({events: {"$elemMatch": ev}}, function(err, docs) {
		if (!err) {
			res.send(docs);
		} else res.send(err);
	});
}




exports.getEvent = function(req, res) {
	_id = req.params._id;
	Event.findOne({
		_id: _id
	}, function(err, doc) {
		if (!err) {
			res.send(doc);
		} else res.send(404, req.url + " not found");
	});
}

exports.putEvent = function(req, res) {
	if (paramsOK(req)) {
		var name = {
			firstname: req.params.firstname,
			surname: req.params.surname
		};
		Event.update({_id: req.params._id},{
			$set: {
				name: name,
				birthdate: req.params.birthdate,
				gender: req.params.gender,
				picture_url: req.params.picture_url,
				facebook_id: req.params.facebook_id,
				email: req.params.email
			}
		}, 
		{upsert: true},
		function(err) {
			if (!err) {
				console.log("event updated");
				res.send(req.url);
			} else {
				console.log(err);
				console.log("Error updating event");
				res.send(404, req.url + " not found");
			}

		});
	} else {
		console.log('params not ok');
		res.send(400, 'Required parameter missing');
	}
}

exports.delEvent = function(req, res) {
	_id = req.params._id;
	Event.remove({
		_id: _id
	}, function(err, doc) {
		if (!err) {
			res.send(req.url.substring(0, req.url.length - _id.length - 1));
		} else res.send(404, req.url + " not found");
	});
}

exports.postEventCheckins = function(req, res) {

	var checkin = new Checkin({
		event: req.params.event,
		event: req.params._id
	});
	event.checkins.push(checkin);
	event.save(function(err) {
		if (!err) {
			checkin.save(function(err) {
				if (!err) {
					res.send('/events/' + event._id);
				} else {
					res.send(err);
				}
			});
		} else {
			res.send(err);

		}
	});
}

exports.postEventPatches = function(req, res) {
	_id = req.params._id;
	console.log("entrato" + _id);
	Event.findOne({
		_id: _id
	}, function(err, event) {
		if (!err) {
			event.patches.push({
				patch: req.params.patch,
				
			});
			event.save(function(err) {
				if (!err) {
					//patch.save(function(err) {
					res.send('events/' + event._id);
				} else {
					res.send(err);

				}
			});
		} else res.send(404, req.url + " not found");
	});

}

exports.delEventPatches = function(req, res) {
	_id = req.params._id;
	console.log("entrato" + _id);
	Event.findOne({
		_id: _id
	}, function(err, event) {
		if (!err) {
			event.patches = [];
			event.save(function(err) {
				if (!err) {
					//patch.save(function(err) {
					res.send('/events/' + event._id);
				} else {
					res.send(err);

				}
			});
		} else res.send(404, req.url + " not found");
	});

}



exports.EventController = EventController;

function paramsOK(req) {
	return _.all(event_params, function(param) { //returns true if all pass the condition
		return (!_.isUndefined(req.params[param]) || !_.isNull(req.params[param]));
	});
	// Make sure each param listed in arr is present in req.query
	// var missing = false;
	// _.each(event_params, function(param) {
	// 	if (_.isUndefined(req.params[param] || _.isNull(req.params[param]))) {
	// 		missing = true;
	// 	}
	// });
	// return missing;
}
function createEventName (req) { //porcata micidiale
	if(!_.isUndefined(req.params.firstname) && !_.isUndefined(req.params.surname)){
		myevent={'name.firstname':req.params.firstname, 'name.surname':req.params.surname};
		return myevent;
	} else if (!_.isUndefined(req.params.firstname) && _.isUndefined(req.params.surname)){
		myevent={'name.firstname':req.params.firstname};
		return myevent;
	} else if (_.isUndefined(req.params.firstname) && !_.isUndefined(req.params.surname)){
		myevent={'name.surname':req.params.surname};
		return myevent;
	} else if (_.isUndefined(req.params.firstname) && _.isUndefined(req.params.surname)){
		myevent={};
		return myevent;
	}
}


function createEventFromParams(req) {
	var myevent = createEventName(req);
	_.each(req.query, function(val, key) {
		if (!_.isUndefined(val) && !_.isNull(val) && _.include(event_params, key) && (key != 'firstname') && (key!='surname')) {
			//if ((key != 'firstname') && (key!='surname')) {
				myevent[key] = val;
			//}
		}
	});
	return myevent;
}
