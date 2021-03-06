var mongoose    = require('mongoose');
var log = require('./log')(module);

mongoose.connect('mongodb://localhost:27017/carsh');
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

// Schemas
var User = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    patronymic_name: { type: String, required: true },
    login: { type: String, required: false },
    password: { type: String, required: false },
    license_number: { type: String, required: true },
    license_valid_until: { type: Date, required: false },
    email: { type: String, required: false },
    phone: { type: Number, required: false },
    distance: { type: Number, default: 0 },
    spent: { type: Number , default: 0 },
    modified: { type: Date, default: Date.now }
});

var Car = new Schema({
    model: { type: String, required: true },
    number: { type: String, required: true },
    color: { type: String, required: true },
    operator: { type: String, required: true },
    insurance: { type: String, required: true },
    price: { type: Number, required: false },
    price_category: { type: Number, required: false },
    fuel_level: { type: Number, default: 75 },
    modified: { type: Date, default: Date.now },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
});

var UserModel = mongoose.model('User', User);
var CarModel = mongoose.model('Car', Car);

module.exports.UserModel = UserModel;
module.exports.CarModel = CarModel;