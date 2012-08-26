var Venue = require('../models/venue.js');
exports.patchUnlocker = {
	tivoliRookie: function(user, patch_id) {
		console.log('tivoliRookie');
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
						else {
							console.log('utente:', user._id);
							console.log('patch: Tivoli Rookie');
						}
					});
				} else{
					console.log('Tivoli Rookie', count);
				}
			}
		});
	},



	tivoliFan: function(user, patch_id) {
		console.log('tivoliFan');
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
						else {
							console.log('utente:', user._id);
							console.log('patch: Tivoli Fan');
						}
					});
				} else{
					console.log('Tivoli Fan', count);
				}
			}
		});


	},

	tivoliPro: function(user, patch_id) {
		console.log('tivoliPro');
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
						else {
							console.log('utente:', user._id);
							console.log('patch: Tivoli Pro');
						}
					});
				} else{
					console.log('Tivoli Pro', count);
				}
			}
		});
	},

	ngoRookie: function(user, patch_id) {

		console.log('inside function', user.checkins.length);
		console.log('ngoRookie');
		Venue.findOne({
			name: 'Never Grow Old'
		}, function(err, venue) {
			if (err) {
				console.log('error while unlocking patch', err);
			} else {
				var id = venue.id;
				var count = 0;
				for (var i = 0; i <= user.checkins.length-1; i++) {
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
						else {
							console.log('utente:', user._id);
							console.log('patch: NGO Rookie');
						}
					});
				}else{
					console.log('NGO Rookie', count);
				}
			}
		});
	},

	ngoFan: function(user, patch_id) {
		console.log('ngoFan');
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
						else {
							console.log('utente:', user._id);
							console.log('patch: NGO Fan');
						}
					});
				} else{
					console.log('NGO Fan', count);
				}
			}
		});
	},

	ngoPro: function(user, patch_id) {
		console.log('ngoPro');
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
						else {
							console.log('utente:', user._id);
							console.log('patch: NGO Fan');
						}
					});
				} else{
					console.log('NGO Pro', count);
				}
			}
		});

	},

	apolloRookie: function(user, patch_id) {
		console.log('apolloRookie');
		Venue.findOne({
			name: 'Apollo Live Club'
		}, function(err, venue) {
			if (err) {
				console.log('error while unlocking patch', err);
			} else {
				var id = venue.id;
				var count = 0;
				for (var i = 0; i < user.checkins.length; i++) {
					if (user.checkins[i].event.venue.toString()== id) {
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
						else {
							console.log('utente:', user._id);
							console.log('patch: Apollo Rookie');
						}
					});
				} else{
					console.log('Apollo Rookie', count);
				}
			}
		});
	},
	apolloFan: function(user, patch_id) {
		console.log('apolloFan');
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
						else {
							console.log('utente:', user._id);
							console.log('patch: Apollo Fan');
						}
					});
				} else{
					console.log('Apollo Fan', count);
				}
			}
		});

	},

	apolloPro: function(user, patch_id) {
		console.log('apolloPro');
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
						else {
							console.log('utente:', user._id);
							console.log('patch: Apollo Pro');
						}
					});
				} else{
					console.log('Apollo Pro', count);
				}
			}
		});
	},
	panemerkilleStart: function(user, patch_id) {
		console.log('panemerkilleStart');
		if (user.checkins.length > 0) {
			user.patches.push({
				patch: patch_id,
				timestamp: new Date()
			});

			user.save(function(err) {
				if (err) console.log(err);
				else {
					console.log('utente:', user._id);
					console.log('patch: PaneMerkille Starter');
				}
			});
		}
	},
};