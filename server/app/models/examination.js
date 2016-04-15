var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Examination', new Schema({
  userId : { type : String },
  timeAllowed : { type : Number },
  questionsTotal : { type: Number },
  startTime : { type : String },
  endTime : { type : String },
  answeredPrompts : { type : Array , "default" : [] },
  completed : { type : String }
}));