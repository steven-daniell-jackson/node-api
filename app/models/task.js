// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var taskSchema = new Schema({
  platform: String,
  clientName: String,
  url: String,
  workDone: String,
  monthFilter: String,
  yearFilter: String, 
  date: Date,
  comments: String
});

// the schema is useless so far
// we need to create a model using it
var task = mongoose.model('Task', taskSchema);

// make this available to our users in our Node applications
module.exports = task;