'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema; // var mongoose = require('mongoose');

module.exports = _mongoose2.default.model('Answer', new Schema({
  userId: { type: String },
  examId: { type: String },
  promptId: { type: String },
  prompt: { type: String },
  answer: { type: String },
  startTime: { type: String },
  endTime: { type: String }
}));
//# sourceMappingURL=answer.js.map