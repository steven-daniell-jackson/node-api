// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var videoSchema = new Schema({
 videoTitle: String,
 videoLink: String,
 videoDescription: String,
 hero: String,
 videoType: String

});

// the schema is useless so far
// we need to create a model using it
var video = mongoose.model('Videos', videoSchema);

// make this available to our users in our Node applications
module.exports = video;