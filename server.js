var restify = require('restify');
var db = require('mongoose');
db.connect('mongodb://localhost/panemerkilledb');
var UserController=require("./controllers/ctrlUser.js");
var VenueController=require("./controllers/ctrlVenue.js");
function test (req, res, next) {
 console.log(req.url);
 res.send(req.url);
  mongo.user.save();
  return next();
 }

var server = restify.createServer();
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

server.get('/users/:id/patches', test);
server.put('/users/:id/patches', test);
server.post('/users/:id/patches', test);
server.del('/users/:id/patches', test);

server.get('/venues', VenueController.getVenues);
//server.put('/venues', VenueController.putVenue);
server.post('/venues', VenueController.postVenues);
server.del('/venues', VenueController.delVenues);

server.get('/venues/:_id', VenueController.getVenue);
server.put('/venues/:_id', VenueController.putVenue);
//server.post('/venues/:id', VenueController.postVenue);
server.del('/venues/:_id', VenueController.delVenue);

server.get('/checkins', test);
server.put('/checkins', test);
server.post('/checkins', test);
server.del('/checkins', test);

server.get('/checkins/:_id', test);
server.put('/checkins/:_id', test);
server.post('/checkins/:_id', test);
server.del('/checkins/:_id', test);

server.get('/patches', test);
server.put('/patches', test);
server.post('/patches', test);
server.del('/patches', test);

server.get('/patches/:_id', test);
server.put('/patches/:id', test);
server.post('/patches/:_id', test);
server.del('/patches/:_id', test);

server.get('/events', test);
server.put('/events', test);
server.post('/events', test);
server.del('/events', test);

server.get('/events/:_id', test);
server.put('/events/:_id', test);
server.post('/events/:_id', test);
server.del('/events/:_id', test);

server.on('NotFound', function(req, res) {
  res.send(404, req.url + ' was not found');
});

server.on('MethodNotAllowed', function(req, res) {
  res.send(405, req.url + ' method not allowed');
});


server.listen(7777, function() {
  console.log('%s listening at %s', server.name, server.url);
});
