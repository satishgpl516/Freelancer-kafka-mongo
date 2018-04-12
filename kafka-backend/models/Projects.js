var mongoose = require('mongoose');

var projectDetails = mongoose.Schema({

        projectname: String,
        projectdescription: String,
        projectskills: [String],
        projectowner: String,
        projectrange: String

});


module.exports = mongoose.model('Project',projectDetails);