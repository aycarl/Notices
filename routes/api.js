var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var express = require('express');
var router = express.Router();


//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects

    //allow all get request methods
    if(req.method === "GET"){
        return next();
    }
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not authenticated then redirect him to the login page
    return res.redirect('/#login');
};

//Register the authentication middleware
router.use('/notices', isAuthenticated);

// router.use(function(req, res, next){

// 	if(req.method === "GET"){
// 		//continue to the next middleware or request handler
// 		return next();
// 	}

// 	if(!req.isAuthenticated()){
// 		//user not authenticated redirect to log in page
// 		res.redirect('/#login');
// 	}

// 	//user authenticated continue to next middleware or handler
// 	return next();

// });

//api for all notices
router.route('/notices')

	//returns all notices
	.get(function(req, res){

		Post.find(function(err, data){
			if(err){
				return res.send(500, err);
			}
			return res.send(data);
		});

		// res.send({message: 'TODO return all notices'});
	})

	//creates a new post
    .post(function(req, res){

        var notice = new Post();
        notice.text = req.body.text;
        notice.created_by = req.body.created_by;
        notice.save(function(err, post) {
            if (err){
                return res.send(500, err);
            }
            return res.json(notice);
        });
    })

router.route('/notices/:id')

	//returns a particular post
	.get(function(req, res){
		Post.findById(req.params.id, function(err, post){
            if(err)
                res.send(err);
            res.json(post);
        });
		// res.send({message: 'TODO return a particular notice with ID ' + req.params.id});
	})

	//update existing post
	.put(function(req, res){

		Post.findById(req.params.id, function(err, post){
            if(err){
            	res.send(err);
            }
                
            post.created_by = req.body.created_by;
            post.text = req.body.text;

            post.save(function(err, post){
                if(err)
                    res.send(err);

                res.json(post);
            });
        });
		// res.send({message: 'TODO modify a particular notice with iD ' + req.params.id});
	})

	//deletes a particular post
	.delete(function(req, res){

		Post.remove({_id: req.params.id}, function(err) {
            if (err)
                res.send(err);
            res.json("deleted :(");
        });
		// res.send({message: 'TODO delete a particular notice wth ID ' + req.params.id});
	});


module.exports = router;