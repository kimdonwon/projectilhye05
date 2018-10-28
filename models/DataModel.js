var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
    location: String,
    data: Number,
    date: String,
    time: String
});

module.exports = mongoose.model('data', dataSchema);
