// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var taskSchema = new Schema({
  taskTitle: String,
  checked: String,
  deleted: String,
  archived: String
});

// the schema is useless so far
// we need to create a model using it
var taskManager = mongoose.model('TaskManager', taskSchema);

// make this available to our users in our Node applications
module.exports = taskManager;