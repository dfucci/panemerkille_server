//TODO: aggiundere la risposta in POST nell'header 'Location' e codice 201
_ = require('../libs/underscore.js');
var Event = require('../models/event.js');
var Venue = require('../models/venue.js');
var event_params = ['name', 'start', 'end', 'description', 'poster_url', 'facebook_url'];
EventController = function() {};

//ridonda con VenueEvents
// exports.getEvents = function(req, res) {
// 	//var ev = createEventFromParams(req); 
// 	var start= new Date();
// 	var end = new Date();
// 	end.setDate(end.getDate()+7);
	
	
// 	var ev = {name: "Pink Party", facebook_url: "http"};
// 	console.log(ev);
// 	Venue.find({events: {"$elemMatch": ev}}, function(err, docs) {
// 		if (!err) {
// 			res.send(docs);
// 		} else res.send(err);
// 	});
// }
exports.postEvents = function(req, res){
	var time ={
		start: req.params.start,
		end: req.params.end};
	var event = new Event({
		name:req.params.name,
		poster_url:req.params.poster_url,
		description:req.params.description,
		facebook_url: req.params.facebook_url,
		time: time
	});

	event.save(function(err) {
		if (!err) {
			res.send(req.url + '/' + event._id);
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
	
}




exports.delEvent = function(req, res) {
	// _id = req.params._id;
	// Event.remove({
	// 	_id: _id
	// }, function(err, doc) {
	// 	if (!err) {
	// 		res.send(req.url.substring(0, req.url.length - _id.length - 1));
	// 	} else res.send(404, req.url + " not found");
	// });
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
