var restify = require('restify');
var db = require('mongoose');
var config = require('./config');
var mongoURL = config.mongo.url;
db.connect(mongoURL);
var port = config.restify.port;
var UserController=require("./controllers/ctrlUser.js");
var VenueController=require("./controllers/ctrlVenue.js");
var PatchController=require("./controllers/ctrlPatch.js");
var EventController=require("./controllers/ctrlEvent.js");
var LeaderboardController=require("./controllers/ctrlLeaderboard.js");

var server = restify.createServer();

server.use(restify.bodyParser());
server.use(restify.queryParser());

server.get('/users',  UserController.getUsers);


server.post('/users', UserController.postUsers);

server.del('/users', UserController.delUsers);

server.get('/users/:_id', UserController.getUser);
server.put('/users/:_id', UserController.putUser);
server.del('/users/:_id', UserController.delUser);

server.get('/users/:_id/friends', UserController.getUserFriends); //returns friends' last checkin
server.post('/users/:_id/friends', UserController.postUserFriends);

server.post('/users/:_id/patches', UserController.postUserPatches);
server.post('users/:u_id/patches/:p_id', UserController.postUserPatch); //It was a PUT
server.del('/users/:_id/patches', UserController.delUserPatches); //TODO

server.post('/users/:_id/checkins', UserController.postUserCheckins);

server.get('/venues', VenueController.getVenues);
server.post('/venues', VenueController.postVenues);
server.del('/venues', VenueController.delVenues);

server.get('/venues/:_id', VenueController.getVenue);
server.put('/venues/:_id', VenueController.putVenue);
server.del('/venues/:_id', VenueController.delVenue);

server.get('/patches', PatchController.getPatches);
server.post('/patches', PatchController.postPatches);
server.del('/patches', PatchController.delPatches);

server.get('/patches/:_id', PatchController.getPatch);
server.put('/patches/:_id', PatchController.putPatch);
server.del('/patches/:_id', PatchController.delPatch);

server.get('/events', EventController.getEvents);
server.post('/events', EventController.postEvents);


server.get('/events/:_id', EventController.getEvent); 
server.del('/events/:_id', EventController.delEvent); 

server.get('/leaderboard', LeaderboardController.getLeaderboard);
server.get('/leaderboard/:_id', LeaderboardController.getLeaderboardVenue);

server.on('NotFound', function(req, res) {
  res.send(404, req.url + ' was not found');
});

server.on('MethodNotAllowed', function(req, res) {
  res.send(405, req.url + ' method not allowed');
});

server.listen(port);
