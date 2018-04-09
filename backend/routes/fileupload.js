var express = require('express');
var router = express.Router();
var multer = require('multer');
var mysql = require('./mysql');
var glob = require('glob');
var changeDestination = __dirname+'/uploads' ;

var filename = '';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("In Multer Storage : changeDestination = "+changeDestination);
        cb(null,changeDestination)
    },
    filename: function (req, file, cb) {
        filename = '/'+file.originalname;
        cb(null, file.originalname)
    }
});

var upload = multer({storage:storage});

router.post('/upload',upload.single('myfile'), function (req, res, next) {

    console.log(req.body);

    console.log(req.file);

    console.log(req.file.destination);
    var filepath =  req.file.destination+ filename;
    console.log(filepath);

    var updateQuery="UPDATE profiledetails SET imagepath ='"+ filepath + "'where username= '"+req.user+"';";

    console.log("Query is:"+updateQuery);

    mysql.executeQuery(function(err){
        if(err){
            throw err;
        }
        else
        {
            res.status(201).json({message:"image uploaded successfully"});
        }
    },updateQuery);

});

module.exports = router;