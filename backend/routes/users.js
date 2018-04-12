var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var passport = require('passport');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var User = require('../models/user');
const saltRounds = 10;
var kafka = require("./kafka/client");
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
          //  return res.redirect('/login');
            return res.status(401).json({message: "invalid user"});
        }
        else{
            req.logIn(user, function(err) {
                if (err) {
                    console.log(err);
                    return res.status(401);
                }
                else{
                    req.session.save(function(err){
                        console.log(req.user);
                        console.log(req.isAuthenticated());
                        req.session.username = req.user;
                       return res.status(201).json({username: req.user});
                    });
                }
            });
        }

    })(req, res, next);
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: '/login' }));

router.get('/auth/facebook',passport.authenticate('facebook',{scope: ['email']  }));

router.get('/auth/facebook/callback',passport.authenticate('facebook',{ successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: '/login'
}));



router.get('/api/current_user',function(req,res){
    if(req.user){
        res.status(201).json({user: req.user});
    }
    else{
        res.status(202).json({user: false});

    }
});



router.get('/biddetails',function (req,res) {
    let project_id = req.query.pid;
    let bidQuery = "select * from userbids where projectid ="+project_id+";";
    //console.log(req.query.username);
    //console.log(reqUsername);

    mysql.fetchData(function (err,result) {
        console.log("Query:",bidQuery);
        if (result.length>0){
            res.status(201).json({resbids:result});
            console.log(result);
        }
        else {
            res.status(401).json({message:"No user bids query failed"});
            throw err;

        }

    },bidQuery);

});

//
// router.get('/profile', authenticationMiddleware(), function(req,res) {
//     res.send({"status":201, "email" : req.session.username , "username":  req.user.email });
// });

router.post('/project',function(req,res) {
    console.log(req.session);
    console.log(req.isAuthenticated());
    console.log(req.user);


    kafka.make_request('postproject',{"project":req.body,"username":req.user.username}, function(err,results) {

        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: "unexpected error occurred"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                res.status(201).json({message: "project posted Saved successfully"});
            }
            else {
                res.status(401).json({message: "post project failed"});

            }
        }
    });

});


router.get('/projects',function(req,res){
     if(req.isAuthenticated()) {
         console.log("Authenticated:", req.isAuthenticated());

     kafka.make_request('postproject',function(err,res){

     })

     }

})


router.get('/postedprojects',function(req,res){
    // if(req.isAuthenticated()){
        let usern = req.session.passport.user;
        console.log("Authenticated:",req.isAuthenticated());
        console.log("username:",usern);
        let proGetQuery = "select * from projects where projectowner='"+usern+"'";
        console.log("Posting a select Project Query" ,proGetQuery);
        mysql.fetchData(function(err,results) {
            if (err)
                throw(err);
            else if (results.length === 0) {
                console.log("no user found");
                res.status(401).json({message: 'No Projects found'});
            }
            if (results.length > 0) {
                var projects = results;
                res.status(201).json({projects: projects});
            }
        },proGetQuery);

    // }
    // else{
    //     res.status(401).json({message: "User is not Authenticated"});
    // }
    //

});

router.get('/projectdetails',function(req,res){
    console.log(req.user);
    // if(req.isAuthenticated()){
    let projectid = req.query.pid;
    let proQuery = "SELECT * FROM projects where Projectid = '"+projectid+"';";
    console.log("Posting a select Project Query" ,proQuery);
    mysql.fetchData(function(err,results) {
        if (err)
            throw(err);
        else if (results.length === 0) {
            console.log("no user found");
            res.status(401).json({message: 'User Project not found'});
        }
        if (results.length > 0) {
            var project = results[0];
            console.log("resProject:",project);
            res.status(201).json({projects: project});
        }

        // }
        // else{
        //     res.status(401).json({message: "User is not Authenticated"});
        // }
    },proQuery);

});



/* Get user Signup */
router.post('/signup', function (req, res) {

    kafka.make_request('signup',{"user":req.body}, function(err,results){

        console.log('in result');
        console.log(results);
        if(err){
            res.status(401).json({message: "SignUp failed"});

        }
        else
        {
            if(results.code === 201){
                console.log("Inside the success criteria");
                res.status(201).json({message: "User Details Saved successfully"});
            }
            else {
                res.status(401).json({message: "SignUp failed"});

            }
        }
    });

});

// router.post('/signup', function(req,res,next) {
//     passport.authenticate('local-signup', function (err, user) {
//         if (err) { return next(err); }
//
//
//     })(req, res, next);
// });

router.post('/userProfile',function(req, res) {
    console.log(req.body)
    console.log("user",req.user);

    kafka.make_request('updateuser',{"user":req.body,"username":req.user.username}, function(err,results) {

        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: "unexpected error occurred"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                res.status(201).json({message: "User Details Saved successfully"});
            }
            else {
                res.status(401).json({message: "profile update failed"});

            }
        }
    });

});


//
// router.post('/uploadImage',function(req,res){
//     console.log(req.files);
//     let imageFile = req.files.newfile;
//     if (!req.files)
//         return res.status(400).send('No files were uploaded.');
//
//     imageFile.mv(`${__dirname}/public/${req.body.picname}.jpg`, function(err){
//         if (err) {
//             return res.status(501).send(err);
//         }
//         res.json({file: `public/${req.body.picname}.jpg`});
//     });
//
// })




//Logout the user - invalidate the session
router.get('/logout', function (req, res) {
    console.log("Authenticated:",req.user);
    req.logout();
    req.session.destroy(function (err) {
        if (!err) {
            res.status(200).clearCookie('connect.sid', {path: '/login'}).json({status: "Success"});
        } else {
            // handle error case...
        }

    });

});


module.exports = router;


