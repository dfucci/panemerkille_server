//TODO: aggiundere la risposta in POST nell'header 'Location' e codice 201
_ = require('../libs/underscore.js');
var Event = require('../models/event.js');
var Venue = require('../models/venue.js');
var event_params = ['name', 'start', 'end', 'description', 'poster_url', 'facebook_url'];
EventController = function() {};


exports.getEvents = function(req, res) {
	var now;
	var oneweek;
	if (req.params.start == undefined) {
		now = new Date();
	}
	if (req.params.end == undefined) {
		oneweek = new Date();
		oneweek.setDate(oneweek.getDate() + 7);
	}
	Event.find({$or:[{'time.end':{$gte:now}, 'time.start':{$lte:now}}, {'time.start':{$gte:now, $lte:oneweek}}]}).sort('time.start', 1).populate('venue').exec(function(err, events){
		if (err) {
			res.send(500, err);
		}else{
			res.send(200, events);
		}
	});
}
// {'time.end':{$gte:now}, 'time.start':{$lte:now}}
// {'time.start':{$gte:now, $lte:oneweek}}
exports.postEvents = function(req, res) {
	var time = {
		start: req.params.start,
		end: req.params.end
	};
	var event = new Event({
		name: req.params.name,
		poster_url: req.params.poster_url,
		description: req.params.description,
		facebook_url: req.params.facebook_url,
		time: time,
		venue: req.params.venue
	});
	Venue.findOne({_id: req.params.venue},
		function(err, venue){
			if (!err) {
				if (venue==null) {
					res.send(500, 'The specified venue does not seem to exist');
				}else{
					event.save(function(err){
						if (err) {
							res.send(err);
						} else{
							res.send(req.url+'/'+event._id);
						}
					});
				}
			}else{
				res.send(err);
			}
		});
	}



exports.getEvent = function(req, res) {
	_id = req.params._id;
	Event.findOne({
		_id: _id
	}).populate('venue').exec(function(err, doc) {
		if (!err) {
			res.send(doc);
		} else res.send(404, req.url + " not found");
	});
}

//TODO:tutta da fare
exports.putEvent = function(req, res) {

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



exports.EventController = EventController;

function paramsOK(req) {
	return _.all(event_params, function(param) { //returns true if all pass the condition
		return (!_.isUndefined(req.params[param]) || !_.isNull(req.params[param]));
	});

}



function createEventFromParams(req) {
	var myevent = createEventName(req);
	_.each(req.query, function(val, key) {
		if (!_.isUndefined(val) && !_.isNull(val) && _.include(event_params, key) && (key != 'firstname') && (key != 'surname')) {
			//if ((key != 'firstname') && (key!='surname')) {
			myevent[key] = val;
			//}
		}
	});
	return myevent;
}