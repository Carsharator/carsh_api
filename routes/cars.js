var express = require('express');
var log = require('../libs/log')(module);
var CarModel = require('../libs/mongoose').CarModel;
var router = express.Router();


/* GET cars listing. */
router.get('/list', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('Respond with a resource');
});

/* POST new car. */
router.post('/new', function(req, res, next) {

    var car = new CarModel({
        model: req.body.model,
        number: req.body.number,
        color: req.body.color,
        operator: req.body.operator,
        insurance: req.body.insurance,
        price: req.body.price,
        price_category: req.body.price_category,
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

/* PUT for car update. */
router.put('/', function (req, res) {
    return CarModel.findOne(req.query.number, function (err, car) {
        if(!car) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }

        car.price_category = req.body.price_category;
        return car.save(function (err) {
            if (!err) {
                log.info("car updated");
                return res.send({ status: 'OK', car:car });
            } else {
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
});

/* GET user by license number. */
router.get('/', function(req, res) {
    return CarModel.find(function (err, cars) {
        if (!err) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            return res.send(cars);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

/* DELETE car by number. */
router.delete('/delete', function (req, res){
    return CarModel.findOne(req.query.number, function (err, car) {
        if(!car) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return car.remove(function (err) {
            if (!err) {
                log.info("car removed");
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });
});


module.exports = router;