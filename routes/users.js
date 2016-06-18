var express = require('express');
var log = require('../libs/log')(module);
var UserModel    = require('../libs/mongoose').UserModel;
var router = express.Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {
  res.send('Respond with a resource');
});

/* POST new user. */
router.post('/new', function(req, res, next) {

  var user = new UserModel({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    patronymic_name: req.body.patronymic_name,
    login: req.body.login,
    license_number: req.body.license_number,
    license_valid_until: req.body.license_valid_until
  });
  
  user.save(function (err) {
    if (!err) {
      log.info("article created");
      return res.send({ status: 'OK', user:user });
    } else {
      console.log(err);
      if(err.name == 'ValidationError') {
        res.statusCode = 400;
        res.send({ error: 'Validation error' });
      } else {
        res.statusCode = 500;
        res.send({ error: 'Server error' });
      }
      log.error('Internal error(%d): %s',res.statusCode,err.message);
    }
  });

});

/* GET user by license number. */
router.get('/', function(req, res) {
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

module.exports = router;