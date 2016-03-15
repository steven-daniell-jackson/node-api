// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var portfolioSchema = new Schema({
  platform: String,
  clientName: String,
  url: String,
  imgsrc: String,
  recent: Boolean,
  date: Date,
  comments: String,
  newsletter: Boolean,
  landingpage: Boolean,
  other: Boolean
});

// the schema is useless so far
// we need to create a model using it
var portfolio = mongoose.model('Portfolio', portfolioSchema);

// make this available to our users in our Node applications
module.exports = portfolio;

