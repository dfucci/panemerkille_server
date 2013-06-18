_ = require('../libs/underscore.js');
var Venue = require('../models/venue.js');
var Event = require('../models/event.js');
exports.patchUnlocker = {
	tivoliRookie: function(user, patch_id) {

		Venue.findOne({
			name: 'Tivoli'
		}, function(err, venue) {
			if (err) {
				console.log('error while unlocking patch', err);
			} else {
				var id = venue.id;
				var count = 0;
				for (var i = 0; i < user.checkins.length; i++) {
					if (user.checkins[i].event.venue.toString() == id) {
						count++;
					}
				}
				if (count >= 3) {
					user.patches.push({
						patch: patch_id,
						timestamp: Date.now()
					});
					user.save(function(err) {
						if (err) console.log(err);
					});
				}
			}
		});
	},



	tivoliFan: function(user, patch_id) {
		Venue.findOne({
			name: 'Tivoli'
		}, function(err, venue) {
			if (err) {
				console.log('error while unlocking patch', err);
			} else {
				var id = venue.id;
				var count = 0;
				for (var i = 0; i < user.checkins.length; i++) {
					if (user.checkins[i].event.venue.toString() == id) {
						count++;
					}
				}
				if (count >= 10) {
					user.patches.push({
						patch: patch_id,
						timestamp: Date.now()
					});
					user.save(function(err) {
						if (err) console.log(err);

					});
				}
			}
		});


	},

	tivoliPro: function(user, patch_id) {

		Venue.findOne({
			name: 'Tivoli'
		}, function(err, venue) {
			if (err) {
				console.log('error while unlocking patch', err);
			} else {
				var id = venue.id;
				var count = 0;
				for (var i = 0; i < user.checkins.length; i++) {
					if (user.checkins[i].event.venue.toString() == id) {
						count++;
					}
				}
				if (count >= 20) {
					user.patches.push({
						patch: patch_id,
						timestamp: Date.now()
					});
					user.save(function(err) {
						if (err) console.log(err);
					});
				}
			}
		});
	},

	ngoRookie: function(user, patch_id) {


		Venue.findOne({
			name: 'Never Grow Old'
		}, function(err, venue) {
			if (err) {
				console.log('error while unlocking patch', err);
			} else {
				var id = venue.id;
				var count = 0;
				for (var i = 0; i <= user.checkins.length - 1; i++) {
					if (user.checkins[i].event.venue.toString() == id) {
						count++;
					}
				}
				if (count >= 7) {
					user.patches.push({
						patch: patch_id,
						timestamp: Date.now()
					});
					user.save(function(err) {
						if (err) console.log(err);

					});
				}
			}
		});
	},

	ngoFan: function(user, patch_id) {

		Venue.findOne({
			name: 'Never Grow Old'
		}, function(err, venue) {
			if (err) {
				console.log('error while unlocking patch', err);
			} else {
				var id = venue.id;
				var count = 0;
				for (var i = 0; i < user.checkins.length; i++) {
					if (user.checkins[i].event.venue.toString() == id) {
						count++;
					}
				}
				if (count >= 15) {
					user.patches.push({
						patch: patch_id,
						timestamp: Date.now()
					});
					user.save(function(err) {
						if (err) console.log(err);

					});
				}
			}
		});
	},

	ngoPro: function(user, patch_id) {
		Venue.findOne({
			name: 'Never Grow Old'
		}, function(err, venue) {
			if (err) {
				console.log('error while unlocking patch', err);
			} else {
				var id = venue.id;
				var count = 0;
				for (var i = 0; i < user.checkins.length; i++) {
					if (user.checkins[i].event.venue.toString() == id) {
						count++;
					}
				}
				if (count >= 25) {
					user.patches.push({
						patch: patch_id,
						timestamp: Date.now()
					});
					user.save(function(err) {
						if (err) console.log(err);

					});
				}
			}
		});

	},

	apolloRookie: function(user, patch_id) {

		Venue.findOne({
			name: 'Apollo Live Club'
		}, function(err, venue) {
			if (err) {
				console.log('error while unlocking patch', err);
			} else {
				var id = venue.id;
				var count = 0;
				for (var i = 0; i < user.checkins.length; i++) {
					if (user.checkins[i].event.venue.toString() == id) {
						count++;
					}
				}
				if (count >= 3) {
					user.patches.push({
						patch: patch_id,
						timestamp: Date.now()
					});
					user.save(function(err) {
						if (err) console.log(err);

					});
				}
			}
		});
	},
	apolloFan: function(user, patch_id) {
		Venue.findOne({
			name: 'Apollo Live Club'
		}, function(err, venue) {
			if (err) {
				console.log('error while unlocking patch', err);
			} else {
				var id = venue.id;
				var count = 0;
				for (var i = 0; i < user.checkins.length; i++) {
					if (user.checkins[i].event.venue.toString() == id) {
						count++;
					}
				}
				if (count >= 10) {
					user.patches.push({
						patch: patch_id,
						timestamp: Date.now()
					});
					user.save(function(err) {
						if (err) console.log(err);

					});
				}
			}
		});

	},

	apolloPro: function(user, patch_id) {

		Venue.findOne({
			name: 'Apollo Live Club'
		}, function(err, venue) {
			if (err) {
				console.log('error while unlocking patch', err);
			} else {
				var id = venue.id;
				var count = 0;
				for (var i = 0; i < user.checkins.length; i++) {
					if (user.checkins[i].event.venue.toString() == id) {
						count++;
					}
				}
				if (count >= 20) {
					user.patches.push({
						patch: patch_id,
						timestamp: Date.now()
					});
					user.save(function(err) {
						if (err) console.log(err);

					});
				}
			}
		});
	},
	panemerkilleStart: function(user, patch_id) {
		if (user.checkins.length > 0) {
			Venue.find({
				featured: true
			}, '_id', function(err, venues) {
				for (var i = 0; i < user.checkins.length; i++) {
					var found = false;
					var idStr = user.checkins[i].event.venue.toString();

					for (var j = 0; j < venues.length; j++) {
						if (venues[j]._id.toString() == idStr) {
							found = true;

							user.patches.push({
								patch: patch_id,
								timestamp: new Date()
							});

							user.save(function(err) {
								if (err) console.log(err);

							});
						}
					}
					if (found) {
						break;
					}
				}
			});
		}

	},
	fridayblastRookie: function(user, patch_id) {
		Event.find({
			tags: {
				$in: ["fridayblast"]
			}
		}, function(err, events) {
			if (err) {
				console.log('error while unlocking patch', err);
			} else {
				var event_ids = _.pluck(events, '_id');
				var count = 0;
				for (var i = 0; i <= user.checkins.length - 1; i++) {
					console.log(event_ids[0]);
					console.log(user.checkins[i].event._id);
					console.log(event_ids.length);
					if (_.indexOf(event_ids, user.checkins[i].event._id != -1)) {
						count++;
					}
				}
				if (count >= 1) {
					user.patches.push({
						patch: patch_id,
						timestamp: Date.now()
					});
					user.save(function(err) {
						if (err) console.log(err);

					});
				}
			}
		});
	},
			fridayblastFan: function(user, patch_id) {
		Event.find({
			tags: {
				$in: ["fridayblast"]
			}
		}, function(err, events) {
			if (err) {
				console.log('error while unlocking patch', err);
			} else {
				var event_ids = _.pluck(events, '_id');
				

				var count = 0;
				for (var i = 0; i <= user.checkins.length - 1; i++) {
					
					console.log(typeof event_ids[0]);
					console.log(typeof user.checkins[i].event._id);
					if (_.indexOf(event_ids, user.checkins[i].event._id != -1)) {
						count++;
					}
				}
				if (count >= 4) {
					user.patches.push({
						patch: patch_id,
						timestamp: Date.now()
					});
					user.save(function(err) {
						if (err) console.log(err);

					});
				}
			}
		});
	},
			fridayblastPro: function(user, patch_id) {
		Event.find({
			tags: {
				$in: ["fridayblast"]
			}
		}, function(err, events) {
			if (err) {
				console.log('error while unlocking patch', err);
			} else {
				var event_ids = _.pluck(events, '_id');

				var count = 0;
				for (var i = 0; i <= user.checkins.length - 1; i++) {

					console.log(typeof event_ids[0]);
					console.log(typeof user.checkins[i].event._id);
					if (_.indexOf(event_ids, user.checkins[i].event._id != -1)) {
						count++;
					}
				}
				if (count >= 7) {
					user.patches.push({
						patch: patch_id,
						timestamp: Date.now()
					});
					user.save(function(err) {
						if (err) console.log(err);

					});
				}
			}
		});
	}

};