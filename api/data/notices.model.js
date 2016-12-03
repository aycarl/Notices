var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose'),
    bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String, //hash created from password
    created_at: {type: Date, default: Date.now}
});

var PostSchema = new mongoose.Schema({
	header: String,
	img: String,
    created_by: {type: mongoose.Schema.ObjectId, ref: 'User'},
    created_at: {type: Date, default: Date.now},
    text: String
});

UserSchema.plugin(passportLocalMongoose);

//declare a model called User which has Schema userSchema
module.exports = mongoose.model("Post", PostSchema);
module.exports = mongoose.model("User", UserSchema);