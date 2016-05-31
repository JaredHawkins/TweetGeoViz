import mongoose from 'mongoose';
import { mongoConfig } from '../../config/config.js';

const { collection } = mongoConfig;
const Schema = mongoose.Schema;

const tweets = new Schema({
  _id   : String,
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
export default mongoose.model(collection, tweets, collection);
