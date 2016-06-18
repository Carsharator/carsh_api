var express = require('express');
var log = require('../libs/log')(module);
var CarModel = require('../libs/mongoose').CarModel;
var router = express.Router();


/* GET cars listing. */
router.get('/list', function(req, res, next) {
    res.send('Respond with a resource');
});

/* POST new car. */
router.post('/new', function(req, res, next) {

    //res.send('Respond with a resource');

    var car = new CarModel({
        model: req.body.model,
        number: req.body.number,
        color: req.body.color,
        operator: req.body.operator,
        insurance: req.body.insurance,
        price: req.body.price,
        fuel_level: req.body.fuel_level,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    car.save(function (err) {
        if (!err) {
            log.info("car created");
            return res.send({ status: 'OK', car:car });
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
    return CarModel.find(function (err, cars) {
        if (!err) {
            return res.send(cars);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

module.exports = router;