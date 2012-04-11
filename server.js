var restify = require('restify');
var db = require('mongoose');
var mongoURL = process.env.MONGOLAB_URI || "mongodb://localhost/panemerkilledb";
console.log(mongoURL);
db.connect(mongoURL);
var port = process.env.PORT || 7777;
console.log(port);
var UserController=require("./controllers/ctrlUser.js");
var VenueController=require("./controllers/ctrlVenue.js");
var PatchController=require("./controllers/ctrlPatch.js");
var EventController=require("./controllers/ctrlEvent.js");

function test (req, res, next) {
 req.log.debug({params:req.params}, 'Trying to get homepage: %s', 'foo' );
 res.send(req.url);
  return next();
 }
var server = restify.createServer();

server.get('/', test);
server.use(restify.bodyParser());
server.use(restify.queryParser());

server.get('/users',  UserController.getUsers);

//server.put('/users', test);
server.post('/users', UserController.postUsers);

server.del('/users', UserController.delUsers);

server.get('/users/:_id', UserController.getUser);
server.put('/users/:_id', UserController.putUser);
//server.post('/users/:id', UserContr);
server.del('/users/:_id', UserController.delUser);

server.get('/users/:id/friends', test);
server.put('/users/:id/friends', test);
server.post('/users/:id/friends', test);
server.del('/users/:id/friends', test);

// server.get('/users/:id/patches', test);  user.patches
// server.put('/users/:id/patches', test); //TODO
server.post('/users/:_id/patches', UserController.postUserPatches);
server.del('/users/:_id/patches', UserController.delUserPatches); //TODO

//server.get('/users/:id/checkins', UserController.getUserCheckins); uso user.checkins
//server.put('/users/:id/checkins', test);  //TODO
server.post('/users/:_id/checkins', UserController.postUserCheckins);
//server.del('/users/:id/checkins', test); //TODO

server.get('/venues', VenueController.getVenues);
//server.put('/venues', VenueController.putVenue);
server.post('/venues', VenueController.postVenues);
server.del('/venues', VenueController.delVenues);

server.get('/venues/:_id', VenueController.getVenue);
server.put('/venues/:_id', VenueController.putVenue);
//server.post('/venues/:id', VenueController.postVenue);
server.del('/venues/:_id', VenueController.delVenue);

server.post('/venues/:_id/events', VenueController.postVenueEvents);



server.get('/checkins', test);
server.put('/checkins', test);
server.post('/checkins', test);
server.del('/checkins', test);

server.get('/checkins/:_id', test);
server.put('/checkins/:_id', test);
server.post('/checkins/:_id', test);
server.del('/checkins/:_id', test);

server.get('/patches', PatchController.getPatches);
//server.put('/patches', test);
server.post('/patches', PatchController.postPatches);
server.del('/patches', PatchController.delPatches);

server.get('/patches/:_id', PatchController.getPatch);
server.put('/patches/:_id', PatchController.putPatch);
//server.post('/patches/:_id', PatchController);
server.del('/patches/:_id', PatchController.delPatch);

//server.get('/events', EventController.getEvents);
//server.put('/events', test);
server.post('/events', EventController.postEvents);
//server.del('/events', EventController.delEvents);

//server.get('/events/:_id', EventController.getEvent); TODO:
//server.put('/events/:_id', EventController.putEvent); TODO:
//server.post('/events/:_id', test);
//server.del('/events/:_id', EventController.delEvent); TODO:

server.on('NotFound', function(req, res) {
  res.send(404, req.url + ' was not found');
});

server.on('MethodNotAllowed', function(req, res) {
  res.send(405, req.url + ' method not allowed');
});
server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
