var express = require('express');
var router = express.Router();

router.get('/articles', function(req, res) {
    res.send('This is not implemented now '+req.body.id);
});

router.post('/articles', function(req, res) {
    res.send('This is not implemented now');
});

router.get('/articles/:id', function(req, res) {
    res.send('This is not implemented now and id is'+ req.body.id);
});

router.put('/articles/:id', function (req, res){
    res.send('This is not implemented now');
});

router.delete('/articles/:id', function (req, res){
    res.send('This is not implemented now');
});

module.exports = router;