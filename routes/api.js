var express = require('express');
var router = express.Router();

router.use(function(req, res, next){

	if(req.method === "GET"){
		//continue to the next middleware or request handler
		return next();
	}

	if(!req.isAuthenticated()){
		//user not authenticated redirect to log in page
		res.redirect('/#login');
	}

	//user authenticated continue to next middleware or handler
	return next();

});

router.route('/notices')

	//returns all notices
	.get(function(req, res){

		//temporary solution

		res.send({message: 'TODO return all notices'});
	})

	.post(function(req, res){

		//temporary solution

		res.send({message: 'TODO create a new notice'});
	});

router.route('/notices/:id')

	//returns a particular post
	.get(function(req, res){

		res.send({message: 'TODO return a particular notice with ID ' + req.params.id});
	})

	//update existing post
	.put(function(req, res){

		res.send({message: 'TODO modify a particular notice with iD ' + req.params.id});
	})

	//deletes a particular post
	.delete(function(req, res){

		res.send({message: 'TODO delete a particular notice wth ID ' + req.params.id});
	});


module.exports = router;