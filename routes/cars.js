var express = require('express');
var log = require('../libs/log')(module);
//var UserModel    = require('../libs/mongoose').UserModel;
var router = express.Router();

/* GET free cars in radius. */
router.get('/', function(req, res) {
    
    /*return UserModel.findOne({ 'license': req.query.login }, function (err, user) {
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
    });*/

    return res.send('Not implemented');
    
});