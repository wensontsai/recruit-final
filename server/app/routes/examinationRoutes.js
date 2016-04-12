var nodemailer = require('nodemailer');
var config = require('../../config');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(config.email.host);


var smtpTransport = nodemailer.createTransport('SMTP', {
   service: config.email.service,
   auth: {
       user: config.email.auth.user,
       pass: config.email.auth.pass
   }
});
exports.startExam = function(Examination) {
  return function(req, res, next) {
    Examination.findOne({ _id: req.body.data.examId }, function(err, exam) {
      if(err) return console.error(err);
      if (!exam) {
        return res.json({ success: false, message: 'No examination exists for that code!' });
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
    var exam = new Examination({
      userId: req.body.data.userId,
      timeAllowed: 7200000,
      startTime: '',
      endTime: '',
      completed: null
    });
    exam.save(function(error, exam){
      if(error) return console.error(error);
      
      User.findOne({ _id: req.body.data.userId }, function(err, user) {
        if(err) return console.error(err);
        if (!user) {
          return res.json({ success: false, message: 'This user does not exist!' });
        } else {

          // -----------------------
          // Send Email to Candidate
          // -----------------------
          var mailOptions = {
              from: config.email.auth.sender_name+ ' ' +config.email.auth.user, // sender address
              to: user.email, // list of receivers
              subject: 'Hello ' +user.firstName+ '!', // Subject line
              text: 'We would like to invite you to participate in a code challenge!\n\nPlease visit http://localhost:3000/exams/' +exam.id+ ' to begin!', // plaintext body
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
    Examination.findOne({ _id: req.body.examId }, function(err, exam) {
      if(err) return console.error(err);
      if (!exam) {
        return res.json({ success: false, message: 'This exam does not exist!' });
      } else {
        User.findOne({ _id: exam.userId }, function(err, user) {
          if(err) return console.error(err);
          if (!user) {
            return res.json({ success: false, message: 'This user does not exist!' });
          } else {
            result = {
              success: true,
              examId: exam._id,
              userId: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            };
          }
          res.json(result);
        });
      }
    });
  };
}
exports.finishExam = function(Examination, User){
  return function(req, res, next){
    Examination.findOne({ _id: req.body.examId }, function(err, exam) {
      if(err) return console.error(err);
      if (!exam) {
        return res.json( { success: false, message: 'No examination exists for that code!' } );
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
      User.findOne({ _id: exam.userId}, function(err, user) {
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














