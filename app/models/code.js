// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var codeSchema = new Schema({
  codeTitle: String,
  codeDescription: String,
  codeSource: String,
  codeImg: String,
  codeDemo: String,
  category: String,
  subCategory: String

});

// the schema is useless so far
// we need to create a model using it
var code = mongoose.model('Code', codeSchema);

// make this available to our users in our Node applications
module.exports = code;