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



router.get('/api/current_user',function(req,res){
    if(req.user){
        res.status(201).json({user: req.user});
    }
    else{
        res.status(202).json({user: false});

    }
});

router.post('/userProfile',function(req, res) {
    console.log(req.body)
    console.log("user",req.user);

    kafka.make_request('updateuser',{"user":req.body,"username":req.username}, function(err,results) {

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

router.post('/bid',function(req,res){
    console.log(req.body);
    kafka.make_request('postbid',{"bid":req.body,"username":req.user.local.username},function(err,results){
        console.log("In result");
        console.log(results);
        if(err){
            throw err;
        }
        else{
            if(results.code ===201){
                console.log("Inside the success criteria");
                res.status(201).json({message: "user bid posted Saved successfully"});
            }
            else{
                res.status(401).json({message:"user bid failed"});
            }
        }
    })
});



router.post('/project',function(req,res) {
    console.log(req.session);
    console.log(req.isAuthenticated());
    console.log("new user",req.user);


    kafka.make_request('postproject',{"project":req.body,"username":req.user.local.username}, function(err,results) {

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

     kafka.make_request('getprojects',{"project":req.query},function(err,results){
         console.log('in result');
         console.log(results);
         if (err) {
             res.status(401).json({message: "unexpected error occurred"});
         }
         else {
             if (results.code === 201) {
                 console.log("Inside the success criteria");
                 res.status(201).json({projects: results.data});
             }
             else {
                 res.status(401).json({message: "post project failed"});

             }
         }


     });

     }

})


router.get('/postedprojects',function(req,res){
    // if(req.isAuthenticated()){
        console.log("Authenticated:",req.isAuthenticated());

        kafka.make_request('postedprojects',{"username":req.user.local.username},function(err,results){
            console.log('in result');
            console.log(results);
            if (err) {
                res.status(401).json({message: "unexpected error occurred"});
            }
            else {
                if (results.code === 201) {
                    console.log("Inside the success criteria");
                    res.status(201).json({projects: results.data});
                }
                else {
                    res.status(401).json({message: "user posted projects not available"});

                }
            }

        });


});

router.get('/searchprojects',function(req,res){
    console.log(req.user);
    let projectname = req.query.proName;
    console.log("project name",projectname);
    kafka.make_request('searchprojects',{'projectname': projectname},function(err,results){
        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: "unexpected error occurred"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                res.status(201).json({projects: results.data});
            }
            else {
                res.status(401).json({message: "project details not retrieved"});
            }
        }
    });

});

router.get('/projectdetails',function(req,res){
    console.log(req.user);
    // if(req.isAuthenticated()){
    let projectid = req.query.pid;
    console.log("project id",projectid);
    kafka.make_request('projectdetails',{"project":projectid},function(err,results){
        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: "unexpected error occurred"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                res.status(201).json({projects: results.data, bids: results.bids});
            }
            else {
                res.status(401).json({message: "project details not retrieved"});

            }
        }
    });

});


//Logout the user - invalidate the session
router.get('/logout', function (req, res) {
    console.log("Authenticated:",req.user);
   // req.logout();
    req.session.destroy(function (err) {
        if (!err) {
            res.status(200).clearCookie('connect.sid', {path: '/login'}).json({message: "Success"});
        } else {
            // handle error case...
        }

    });

});


module.exports = router;


