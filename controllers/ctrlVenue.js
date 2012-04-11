var Venue = require('../models/venue.js');
var Event = require('../models/event.js').Event;

console.log(Event);

VenueController = function(){};

exports.getVenues =function(req, res) {
	Venue.find({}, function (err, docs) {
			if(!err){
				res.send(docs);
			}
		});	
	}


exports.postVenues =function(req, res) {
var venue = new Venue({
		lat:req.body.lat,
		lon:req.body.lon,
		city:req.body.city,
		featured:req.body.featured,
		name:req.body.name,
		address:req.body.address,
		picture_url:req.body.picture_url,
		description:req.body.description,
	});
	venue.save(function(err) {
		if(!err){
			res.send(req.url+'/'+venue._id);
		}
	});
}
exports.delVenues=function (req,res) {
	Venue.remove({}, function  (err) {
		if(!err){
			res.send(req.url);
		}
	});
}


exports.getVenue = function(req, res) {
	_id=req.params._id;
	Venue.findOne({_id:_id}, function (err, doc) {
		if(!err){
			res.send(doc);
		}
	});	
}

exports.putVenue=function (req, res) {
 	_id=req.params._id;
	Venue.update({_id:_id}, {$set:{
		lat:req.body.lat,
		lon:req.body.lon,
		city:req.body.city,
		featured:req.body.featured,
		name:req.body.name,
		address:req.body.address,
		picture_url:req.body.picture_url,
		description:req.body.description,
	}}, {upsert: true},function  (err) {
		if (!err){
			res.send(req.url);
		}
		
	});	

}

exports.delVenue=function (req, res) {
	_id=req.params._id;
	Venue.remove({_id:_id}, function (err, doc) {
		if(!err){
			res.send(req.url.substring(0, req.url.length-_id.length-1));	
		}	
	});	
}



exports.postVenueEvents= function(req, res) {
	_id = req.params._id;
	console.log(_id);
	Venue.findOne({
		_id: _id
	}, function(err, venue) {
		
		if (!err) {
			console.log(venue);
			venue.events.push(req.params.event);
			venue.save(function(err) {
				if (!err) {
					//patch.save(function(err) {
					res.send('venue/' + venue._id);
				} else {
					res.send(err);

				}
			});
		} else res.send(404, req.url + " not found");
	});

}


exports.VenueController=VenueController;
