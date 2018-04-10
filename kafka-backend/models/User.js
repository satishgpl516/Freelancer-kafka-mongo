var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema       = mongoose.Schema;


var options = {
  //  useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 20, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};

mongoose.connect('mongodb://localhost:27017/freelancer', options); // connect to our database


var mongoose = require('mongoose');
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