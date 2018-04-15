var mongoose = require('mongoose');

var UserProfileSchema = mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    aboutme: String,
    skills: [String],
    mobile: Number,
    imagepath: String

});


module.exports = mongoose.model('UserProfile',UserProfileSchema);