var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');




module.exports.registerUser = function(req,res){
  console.log(req);
  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
          if (err) {
            res
            .status(500)
            .json(err);
          }

          passport.authenticate('local')(req, res, function () {
            res
            .status(201)
            .json({state: 'success', user: req.user ? req.user : null});
          });
      });

}

module.exports.login = function(req,res){
  //console.log(res);

  passport.authenticate('local', function(err, user) {
      if (err) {
        res
          .status(500)
          .json({state: 'failure', user: null, message: err});
          return;
        }
      // Redirect if it fails
      if (!user) {
        res
          .status(404)
          .json({state: 'failure', user: null, message: "Invalid username or password"});
          return;
       }
      // req.logIn(user, function(err) {
      // if (err) {
      //   res
      //   .status(500)
      //   .json({state: 'failure', user: null, message: err});
      //   return;}
      // Redirect if it succeeds
      res
        .status(200)
        .json({state: 'success', user: user.username ? user.username : null});
      // });
      })(req, res);



}

module.exports.logout = function(req,res){
      var username = req.body.username;
      req.logout();

        res
        .status(200)
        .json({state: 'success', user: null, message: "Logged Out"});




}
