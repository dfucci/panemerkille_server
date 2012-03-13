/*TODO
-test PUT con id sbagliato 404
*/
var User = require('../models/user.js');
var db = require('mongoose');
db.connect('mongodb://localhost/panemerkilledb');
var APIeasy = require('api-easy'),
    assert = require('assert');

var suite = APIeasy.describe('/users');
suite.use('localhost', 7777);

suite.discuss('When using the User resource')
suite.before('set up the context', function(ongoing) {
    User.remove({}, function  (err) {
      if(!err) console.log('Emptied DB');
      else console.log(err);
    });
    return ongoing;
});

suite.discuss('When testing error codes')
  .setHeader('Content-Type', 'application/x-www-form-urlencoded')
  .put('/users/michele').expect(400)
  .put('/users').expect(405)
  .post('/users/michele').expect(405)
  .get('/users/michele').expect(404)
  .put('/users/michele', {
    name:'Davide',
    surname:'F',
    birthdate:'06/16/1985',
    gender:'male',
    picture_url:'none',
    facebook_id:'Aldo',
    email:'mia@mio.fi'
  }).expect(404)
.undiscuss();

suite.discuss('When testing GET /users')
.get('/users').expect(200)
.expect('should respond with a not null JSON object', function(err, res, body) {
  //console.log('testing "should respond with a not null JSON object"');
  var result = JSON.parse(body);
  assert.isNotNull(result);

})
.expect('should return an empty JSON array', function  (err, res, body) { 
  //console.log('testing "should return an empty JSON array"');
    
    var results = JSON.parse(body);
   assert.isEmpty(results);
})
.undiscuss();

suite.discuss('When testing POST /users')
.post('/users', {
    name:'Davide',
    surname:'F',
    birthdate:'06/16/1985',
    gender:'male',
    picture_url:'none',
    facebook_id:'Aldo',
    email:'mia@mio.fi'
  })
.expect('should return a not null JSON object', function  (err, res, body) {
  //console.log('testing "should return a not null JSON object"');
  var result = JSON.parse(body);
  assert.isNotNull(result);
})
.undiscuss()
.undiscuss()
.export(module);