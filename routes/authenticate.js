var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bCrypt');

var users = {};
console.log("auth");

passport.use('login', new LocalStrategy({
    passReqToCallback : true
},

function(req, username,password,done){
    if (users[username]) {
        console.log('User not found with username'+ username);
        return done(null,false);
    }

    if (isValidPassword(users[username], password)) {
        //sucessfully authenticated
        return done(null,users[username]);

    } 
    else{
        console.log('Invalid password'+username);
        return done(null,false);
    }

    }



));


User.findOne({'username' : username },
    function(err, user){
        //In case of any error, return using the done method 
        if(err)
            return done(err);
        //username does not exist, log error and redirect back
        if(!user){
            console.log('User not found with username'+username);
            return done(null, false);
        }
        //user exists but wron password, log the error
        if (!isValidPassword(user,password)) {
            console.log('Invalid Password');
            return done(null,false); //redirect back to login page
        }

        //User and password both match, return user from done method
        //which will be treated  like success
        return done(null,user);
    })
module.exports = function(passport){

    //sends successful login state back to angular
    router.get('/success', function(req, res){
        res.send({state: 'success', user: req.user ? req.user : null});
    });

    //sends failure login state back to angular
    router.get('/failure', function(req, res){
        res.send({state: 'failure', user: null, message: "Invalid username or password"});
    });

    //log in
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    //sign up
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    })); 

    //log out
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;

}