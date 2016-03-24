var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  name : { type : String, required : true },
  email : { type : String, required : true },
  emailCode : { type : String, required : true },
  admin : { type : String, required : true }
}));