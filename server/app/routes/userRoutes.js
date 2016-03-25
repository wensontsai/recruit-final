exports.addUser = function(User){
  return function(req, res, next){
    console.log(req.body);
    User.findOne({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email }, function(err, user){
      if(err) return console.error(err);
      if (user) {
        return res.json( {success: false, message: 'This user already exists!'} );
      } else {
        var user = new User({
          firstName : req.body.firstName,
          lastName : req.body.lastName,
          email : req.body.email,
          admin: req.body.admin
        });

        user.save(function(err, user){
          if(err) return console.error(err);
          console.log(user);
          res.send(user);
        });
      }
    });
  };
};

exports.queryAllUsers = function(User){
  return function(req, res, next){
    User.find({}, function(err, users){
      if(err) return console.error(err);
      res.json(users);
    });
  };
};