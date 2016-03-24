var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Prompt', new Schema({
  question : { type : String, required : true }
}));