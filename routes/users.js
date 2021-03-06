var express = require('express');
var log = require('../libs/log')(module);
var UserModel    = require('../libs/mongoose').UserModel;
var router = express.Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send('Respond with a resource');
});

/* GET all users. */
router.get('/all', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return UserModel.find(function (err, user) {
    if (!err) {
      return res.send(user);
    } else {
      res.statusCode = 500;
      log.error('Internal error(%d): %s',res.statusCode,err.message);
      return res.send({ error: 'Server error' });
    }
  });
});

/* POST new user. */
router.post('/new', function(req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');

  UserModel.findOne({ 'license_number': req.body.license_number }, function (err, user) {
    if(user) {
      log.info("user already created");
      res.statusCode = 200;
      return res.send({ status: 'OK', user:user });
    } else {
      log.info("try create new user");

      var new_user = new UserModel({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        patronymic_name: req.body.patronymic_name,
        login: req.body.login,
        license_number: req.body.license_number,
        license_valid_until: req.body.license_valid_until,
        email: req.body.email,
        phone: req.body.phone
      });

      new_user.save(function (err) {
        if (!err) {
          log.info("user created");
          return res.send({ status: 'OK', user:new_user });
        } else {
          console.log(err);
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            console.log(req);
            res.send({ error: 'Validation error', detail:err });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error', detail:err });
          }
          log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
      });
    }
  });

});

/* GET user by license number. */
router.get('/', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return UserModel.findOne({ 'license_number': req.query.license_number }, function (err, user) {
    if(!user) {
      res.statusCode = 404;
      return res.send({ error: 'Not found' });
    }
    if (!err) {
      return res.send({ status: 'OK', user:user });
    } else {
      res.statusCode = 500;
      log.error('Internal error(%d): %s',res.statusCode,err.message);
      return res.send({ error: 'Server error' });
    }
  });
});

/* GET drop all users. */
router.get('/deleteall', function (req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  return UserModel.remove({}, function(err) {
    console.log('cars removed');
    return res.send({ status: 'OK' });
  });
});

module.exports = router;
