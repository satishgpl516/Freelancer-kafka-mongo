var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

const saltRounds = 10;

var userSchema = mongoose.Schema({
    local: {
        id: String,
        username: String,
        email: String,
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String,
        username: String,
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String,
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String,
    },
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hash(password, saltRounds, null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compare(password, this.local.password);
};

module.exports = mongoose.model('User',userSchema);