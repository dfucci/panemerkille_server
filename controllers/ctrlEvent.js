//TODO: aggiundere la risposta in POST nell'header 'Location' e codice 201

//Error codes: 3xx

moment = require('moment');
_ = require('../libs/underscore.js');
var Event = require('../models/event.js');
var Venue = require('../models/venue.js');
var event_params = ['name', 'start', 'end', 'description', 'poster_url', 'facebook_url', 'tags'];
EventController = function() {};


exports.getEvents = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var now;
	var oneweek;
	if (req.params.start == undefined) {
		now = new Date();
	}
	if (req.params.end == undefined) {
		oneweek = new Date();
		oneweek.setDate(oneweek.getDate() + 7);
	}
	Event.find({$or:[{'time.end':{$gte:now}, 'time.start':{$lte:now}}, {'time.start':{$gte:now, $lte:oneweek}}]}, 'name poster_url _id time venue attenders tags')
	.sort('time.start').populate('venue', 'featured name').exec(function(err, events){

		if (err) {
			res.send(500, 'Error #301: '+err);
		}else{
			events = _.sortBy(events, function(event){
				var pos = 0;
				var partyDay = moment(event.time.start);
				var today = moment();
				pos = partyDay.diff(today, 'days')*2;
				if(!event.venue.featured){
					pos+=1;
				}
				return pos;

			});
			res.send(events);
		}
	});
}

exports.postEvents = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var time = {
		start: req.params.start,
		end: req.params.end
	};
	var tags = [];
	tags.push(req.params.tags);
	var event = new Event({
		name: req.params.name,
		poster_url: req.params.poster_url,
		description: req.params.description,
		facebook_url: req.params.facebook_url,
		time: time,
		price: req.params.price,
		age_limit: req.params.age_limit,
		venue: req.params.venue,
		tags: tags
	});
	//Check the existence of the venue
	Venue.findOne({_id: req.params.venue},
		function(err, venue){
			if (!err) {
				if (venue==null) {
					res.send(404, 'The specified venue has not been found');
				}else{
					event.save(function(err){
						if (err) {
							res.send(500, 'Error #302: '+err);
						} else{
							res.send(req.url+'/'+event._id);
						}
					});
				}
			}else{
				res.send(500, 'Error #303: '+err);
			}
		});
	}



exports.getEvent = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	_id = req.params._id;
	Event.findOne({
		_id: _id
	}).populate('venue', 'lat lon name featured _id').populate('attenders.attender', '_id picture_url').exec(function(err, doc) {
		if (err)
			res.send(500, 'Error #304: '+err);
		else if (doc == null)
			res.send(404, "The requested event has not been found");
		else
			res.send(doc);

	});
}

//TODO:tutta da fare
exports.putEvent = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");

}


exports.delEvent = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	_id = req.params._id;
	Event.remove({
		_id: _id
	}, function(err, doc) {
		if (!err) {
			res.send('/events/');
		} else res.send(500, 'Error #305: '+err);
	});
}

exports.EventController = EventController;

/*
function paramsOK(req) {
	return _.all(event_params, function(param) { //returns true if all pass the condition
		return (!_.isUndefined(req.params[param]) || !_.isNull(req.params[param]));
	});

}
*/

/*
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
}*/