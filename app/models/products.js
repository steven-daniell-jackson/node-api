// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var productSchema = new Schema({
  productName: String,
  productcode: String,
  productDescription: String,
  productImage: String,
  quantity: String,
  price: String,
  category: String,
  subCategory: String

});

// the schema is useless so far
// we need to create a model using it
var product = mongoose.model('Product', productSchema);

// make this available to our users in our Node applications
module.exports = product;