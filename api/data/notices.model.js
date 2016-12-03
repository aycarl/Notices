var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose'),
    bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    username: String,
    password: String, //hash created from password
    privilege: String,    //organisations: [OrganisationSchema],
    is_deleted: { type: Number, 'default': 0 },
    created_at: {type: Date, 'default': Date.now}
});

var PostSchema = new mongoose.Schema({
	header: String,
	img: String,
    created_by: {type: mongoose.Schema.ObjectId, ref: 'User'},
    created_at: {type: Date, 'default': Date.now},
    text: String,
    title: String,
    category: String,
    is_deleted: { type: Number, 'default': 0 },
    location:{ type:[Number], index:'2dsphere'},//    resources:[ResourceSchema],    image:[ImageSchema],
    links: String //,    video:[VideoSchema]
});

var ResourceSchema = new mongoose.Schema({
  file_name: String,
  file_type: String,
  created_at: {type: Date, 'default': Date.now}
});

var ImageSchema = new mongoose.Schema({
  image_name: String,
  image_type: String,
  created_at: {type: Date, 'default': Date.now}
});

var VideoSchema = new mongoose.Schema({
  video_name: String,
  video_type: String,
  created_at: {type: Date, 'default': Date.now}
});

var OrganisationSchema = new mongoose.Schema({
  name: String,
  description: String,
  created_at: {type: Date, 'default': Date.now}
})





UserSchema.plugin(passportLocalMongoose);

//declare a model called User which has Schema userSchema
module.exports = mongoose.model("Post", PostSchema);
module.exports = mongoose.model("User", UserSchema);