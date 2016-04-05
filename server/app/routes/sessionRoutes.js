var jwt = require('jsonwebtoken');
var config = require ('../../config');

exports.loginUser = function(User, Session, app) {
  var result = {};
  return function(req, res, next){
    console.log(req.body);
    User.findOne({ email: req.body.email }, function(err, user) {
      console.log(user);
      if(err) return console.error(err);
      if (!user) {
        return res.json({ success: false, message: 'User Email not found!' });
      }
      if (user.admin !== 'Y') {
        return res.json({ success: false, message: 'User does not have Admin privileges!' });
      }
      // if(user.password !== req.body.password) {
      //   return res.json({ success: false, message: 'Authentication failed.  Wrong password!' });
      // }
      var token = jwt.sign(user, config.secret, {
        expiresIn: 1440 //expires in 24hrs
      });
      
      result = {
        success: true,
        message: 'Enjoy your token!',
        token: token,
        userId: user._id,
        userEmail: user.email
      }
      console.log(result);
      res.json(result);
    });
  };
}
exports.logoutUser = function(User, Session, app) {
  return function(req, res, next){
    User.findOne({ name: req.body.email }, function(err, user) {
      if(err) return console.error(err);
      if (!user) {
        return res.json({ success: false, message: 'User Email not found!' });
      }
      if (user.admin !== 'Y') {
        return res.json({ success: false, message: 'User does not have Admin privileges!' });
      }
      if(user.password !== req.body.password) {
        return res.json({ success: false, message: 'Authentication failed.  Wrong password!' });
      }
      var token = jwt.sign(user, app.get('secret'), {
        expiresIn: 1440 //expires in 24hrs
      });

      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
    });
  };
}
exports.authenticateUser = function(User, Session, app) {
  return function(req, res, next){
    User.findOne({ name: req.body.email }, function(err, user) {
      if(err) return console.error(err);
      if (!user) {
        return res.json({ success: false, message: 'User Email not found!' });
      }
      if (user.admin !== 'Y') {
        return res.json({ success: false, message: 'User does not have Admin privileges!' });
      }
      if(user.password !== req.body.password) {
        return res.json({ success: false, message: 'Authentication failed.  Wrong password!' });
      }
      var token = jwt.sign(user, app.get('secret'), {
        expiresIn: 1440 //expires in 24hrs
      });

      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
    });
  };
}