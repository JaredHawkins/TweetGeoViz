var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    config = require('../config/config.json').mongo;

var tweets = new Schema({
  lang  : String,
  loc   : String,
  plt   : Number,
  uid   : String,
  tlt   : Number,
  cc    : String,
  f     : String,
  p     : String,
  flrs  : String,
  acr   : String,
  t     : String,
  cr    : Date,
  pln   : Number,
  tln   : Number
});

// note: the third parameter force the name of the collection
module.exports = mongoose.model(config.collection, tweets, config.collection);
