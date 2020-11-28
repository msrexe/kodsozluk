var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Entry = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date(),
  }
});

module.exports = mongoose.model('Entry', Entry);