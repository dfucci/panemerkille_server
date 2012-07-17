//Error codes: 1xx


var Venue = require('../models/venue.js');
var Event = require('../models/event.js').Event;



console.log(Event);

VenueController = function(){};

exports.getVenues =function(req, res) {
	Venue.find({}, function (err, docs) {
			
			if (err)
				res.send(500, 'Error #101: '+err);
			else 
				res.send(docs);
			
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
		if(err)
			res.send(500, 'Error #102: '+err);
		else
			res.send('/venues/'+venue._id);
		
	});
}


exports.delVenues=function (req,res) {
	Venue.remove({}, function  (err) {
		if(err)
			res.send(500, 'Error #103: '+err);
		else
			res.send('/venues/');
		
	});
}


exports.getVenue = function(req, res) {
	_id=req.params._id;
	Venue.findOne({_id:_id}, function (err, doc) {
		if(err)
			res.send(500, 'Error #104: '+err);
		else if (doc == null)
			res.send (404, 'The specified venue has not been found');
		else
			res.send(doc);
		
	});	
}
//TODO: check 
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
		if (err)
			res.send(500, 'Error #105: '+err);
		else
			res.send(req.url);
		
		
	});	

}

exports.delVenue=function (req, res) {
	_id=req.params._id;
	Venue.remove({_id:_id}, function (err, doc) {
		if (err)
			res.send(500, 'Error #106: '+err);
		else
			res.send('/venues/');	
			
	});	
}





exports.VenueController=VenueController;
