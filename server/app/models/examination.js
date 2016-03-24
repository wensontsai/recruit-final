var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Examination', new Schema({
  userId : { type : String, required : true },
  emailCode : { type : String, required : true },
  timeAllowed : { type : String, required : true },
  startTime : { type : String, required : true },
  endTime : { type : String, required : true },
  completed : { type : String, required : true }
}));