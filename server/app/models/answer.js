var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Answer', new Schema({
  userId : { type : String },
  examId : { type : String },
  promptId : { type : String },
  answer : { type : String },
  startTime : { type : String },
  endTime : { type : String }
}));