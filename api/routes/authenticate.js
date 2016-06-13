var express = require('express');
var router = express.Router();
var AuthController = require('../controller/authenticate.controller.js')


router
  .route('/signup')
  .post(AuthController.registerUser);

router
    .route('/login')
    .post(AuthController.login);

router
    .route('/logout')
    .get(AuthController.logout);

router
    .route('/success')
    .get(function(req, res){
        res.send({state: 'success', user: req.user ? req.user : null});
    });

router
    .route('/failure')
    .get(function(req, res){
        res.send({state: 'failure', user: null, message: "Invalid username or password"});
    });

module.exports = router;
