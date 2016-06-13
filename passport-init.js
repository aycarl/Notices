var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var User = mongoose.model('User');


module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        
        console.log('serializing user:',user.username);
        //return the unique db id for the user
        return done(null, user._id);
    });


    passport.deserializeUser(function(id, done) {

        User.findById(id, function(err, user){

            if (err) {
                return done(err, false);
            }

            if (!user){
                console.log('user not found: ', user.username)
                return done('user not found', false);
            }
            // we found the user object, return
            return done(user, true);
        });

    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            //check if user exists
            User.findOne({'username': username}, function(err, user){

                if (err) {
                    return done(err, false);
                }

                //if there is no user with this username
                if (!user){
                    return done('user' + username + ' not found', false);
                }

                if (!isValidPassword(user, password)) {
                    //wrong password
                    console.log('incorrect password');
                    return done('incorrect password', false);
                }

                return done(null, user);
            });

        }

    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            User.findOne({'username': username}, function(err, user){

                if(err){
                    console.log('Error in signup: '+ err);
                    return done(err, false);
                }

                if(user){
                    console.log('username ' + username + ' already taken');
                    //we have already signed this user us
                    return done('username already taken', false);
                }

                //create a new user
                var user = new User();

                user.username = username;
                user.password = createHash(password);

                user.save(function(err, user){

                    if(err){
                        return done(err, false);
                    }
                    console.log('Registration successful' + username);

                    return done(null, user);
                });

            });

        })
    );

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};