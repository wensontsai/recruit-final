import nodemailer from 'nodemailer';

var Notifications = require('../notifications');

var config = require('../../config');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(config.email.host, {
  debug: true,
});

var smtpTransport = nodemailer.createTransport('SMTP', {
   service: config.email.service,
   auth: {
       user: config.email.auth.user,
       pass: config.email.auth.pass
   }
});

exports.startExam = function(Examination) {
  return function(req, res, next) {
    var messagesArray = [];

    Examination.findOne({ _id: req.body.data.examId }, function(err, exam) {
      if(err) return console.error(err);
      if (!exam) {
        Notifications.prepareMessagesArray(messagesArray, 'No examination exists for that code!');
        return res.status(500).json({
          error:
            { messagesArray: messagesArray,
            }
        });
      }
      if (exam) {
        var now = new Date();
        exam.startTime = now;
        exam.endTime = new Date(now.getTime() + (2*1000*60*60));

        exam.save(function(err) {
          if (err) {
            console.log('error saving :(');
            console.error(err);
          } else {
            console.log('Model - Examination: startExam - Save successful ;)');
          }
        });
      }
      res.json(exam);
    });
  };
};
exports.initializeExam = function(Examination, User) {
  return function(req, res, next) {
    var result = {};
    var messagesArray = [];

    var exam = new Examination({
      userId: req.body.data.userId,
      timeAllowed: 7200000,
      questionsTotal: 3,
      startTime: null,
      endTime: null,
      answeredPrompts: [],
      completed: null
    });
    exam.save(function(error, exam){
      if(error) return console.error(error);
      
      User.findOne({ _id: req.body.data.userId }, function(err, user) {
        if(err) return console.error(err);
        if (!user) {
          Notifications.prepareMessagesArray(messagesArray, 'This user does not exist!');
          return res.status(500).json({
            error:
              { messagesArray: messagesArray,
              }
          });
        } else {

          // -----------------------
          // Send Email to Candidate
          // -----------------------
          var mailOptions = {
              from: config.email.auth.sender_name+ ' ' +config.email.auth.user, // sender address
              to: user.email, // list of receivers
              subject: 'Hello ' +user.firstName+ '!', // Subject line
              text: 'We would like to invite you to participate in a code challenge!\n\nPlease visit ' +config.email.testPath+ '/' +exam.id+ ' to begin!', // plaintext body
              // html: '<b>Hello world 🐴</b>' // html body
          };
          
          // send mail with defined transport object
          // transporter.sendMail(mailOptions, function(error, info){
          //     if(error){
          //         return console.log(error);
          //     }
          //     console.log('Message sent: ' + info.response);
          // });

          // save user object
          user.currentExam = true;
          user.save(function(err) {
            if (err) {
              console.log('error saving :(');
              console.error(err);
            } else {
              console.log('Model - Users: initializeExam - Save successful ;)');
            }
          });

          result = {
            examId: exam._id
          };
        }
        res.json(result);
      });
    });
  };
}
exports.queryExam = function(Examination, User) {
  return function(req, res, next) {
    var result = {};
    var messagesArray = [];

    Examination.findOne( { _id: req.params.examId } )
      .exec()
      .then (function(exam) {
        result['examId'] = exam._id;
        result['timeAllowed'] = exam.timeAllowed;
        result['questionsTotal'] = exam.questionsTotal;
        result['startTime'] = exam.startTime;
        result['endTime'] = exam.endTime;
        result['answeredPrompts'] = exam.answeredPrompts;
        result['completed'] = exam.completed;

        return User.findOne( { _id:  exam.userId } )
          .exec()
          .then (function(user) {
            result['userId'] = user._id;
            result['firstName'] = user.firstName;
            result['lastName'] = user.lastName;
            result['email'] = user.email;       
            return result;
          }, function(err) {
              Notifications.prepareMessagesArray(messagesArray, 'This User does not exist  !');
              return res.status(500).json({
                error:
                  { messagesArray: messagesArray,
                  }
              });

          })
      }, function(err) {
          Notifications.prepareMessagesArray(messagesArray, 'This exam does not exist !');
          return res.status(500).json({
            error:
              { messagesArray: messagesArray,
              }
          });
      })
      .then(function() {
        res.json(result);
      })

  }
}

exports.finishExam = function(Examination, User) {
  return function(req, res, next) {
    var messagesArray = [];
    
    Examination.findOne({ _id: req.body.examId }, function(err, exam) {
      if(err) return console.error(err);
      if (!exam) {
        Notifications.prepareMessagesArray(messagesArray, 'No examination exists for that code!');
        return res.status(500).json({
          error:
            { messagesArray: messagesArray,
            }
        });

      }
      if (exam) {
        exam.completed = 'Y';
        exam.save(function(err) {
          if (err) {
            console.log('error saving :(');
            console.error(err);
          } else {
            console.log('Model - Examination: finishExam - Save successful ;)');
          }
        });
      }
      User.findOne({ _id: exam.userId }, function(err, user) {
        user.completed = 'Y';
        user.save(function(err) {
          if (err) {
            console.log('error saving :(');
            console.error(err);
          } else {
            console.log('Model - User: finishExam - Save successful ;)');
          }
        });

        res.json({
          success: true
        });
      
      });
    });



  };
};














