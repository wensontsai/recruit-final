'use strict';

// bcrypt password hashing
var bcrypt = require('bcrypt');

exports.addUser = function (User) {
  return function (req, res, next) {
    User.findOne({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email }, function (err, user) {
      if (err) return console.error(err);
      if (user) {
        return res.json({ success: false, message: 'This user already exists!' });
      } else {
        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(req.body.password, salt);

        var user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPassword,
          admin: req.body.admin,
          currentExam: null
        });
        user.save(function (err, user) {
          if (err) return console.error(err);
          res.json(user);
        });
      }
    });
  };
};

exports.queryAllUsers = function (User) {
  return function (req, res, next) {
    User.find({}, function (err, users) {
      if (err) return console.error(err);
      res.json(users);
    });
  };
};
//# sourceMappingURL=userRoutes.js.map