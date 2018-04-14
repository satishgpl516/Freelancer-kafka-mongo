var mongoose = require('mongoose');

var UserBidsSchema = mongoose.Schema({
    projectid: String,
    biddername: String,
    bidprice: String,
    noofdays: String,
    bidtime: String

});


module.exports = mongoose.model('Userbid',UserBidsSchema);