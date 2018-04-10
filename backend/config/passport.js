var LocalStrategy   = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20');
var FacebookStrategy = require('passport-facebook').Strategy;
var sqlcon  = require('../routes/mysql');
var bcrypt = require('bcrypt');
var keys = require ('./keys');
var mongoose = require('mongoose');
var User = require('../models/user');
var kafka = require('../routes/kafka/client');
SALT_WORK_FACTOR = 10;
module.exports = function(passport){

    passport.serializeUser(function(user, done) {
        console.log('serialize',user);
        done(null, user.id);
    });
// used to deserialize the user
    passport.deserializeUser(function(id, done) {
         User.findOne({'local.id':id}, function(err, user) {
             console.log('deserialize',user);
            done(err, user);
        });
    });

    passport.use(new LocalStrategy('local', function(username,password ,done){
            console.log(username);
        console.log(password);
        kafka.make_request('login',{"username":username,"password":password}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                done(err,{});
            }
            console.log("results status",results.local);
            if(results.code == 401){;
                console.log("hello strategy");
                done(null,false,{message:"Invalid Username password"});
            }
            else {
                console.log("I dont know");
                done(null,results.local);
            }
        });


        }
    ));
    passport.use(new GoogleStrategy({
        clientID: keys.googleAuth.googleClientID,
        clientSecret:keys.googleAuth.googleClientSecret,
        callbackURL: "/users/auth/google/callback"
    },function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({ 'google.id': profile.id }, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, user);
                } else {
                    console.log('proifle:',profile);
                    console.log('token:',token);
                    var newUser = new User();
                    newUser.google.id = profile.id;
                    newUser.google.token = token;
                    newUser.google.name = profile.displayName;
                    newUser.google.email = profile.emails[0].value;
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser, {message:"login Successful"});
                    });
                }
            });
        });
    }));


    passport.use(new FacebookStrategy({
            clientID: keys.facebookAuth.clientID,
            clientSecret: keys.facebookAuth.clientSecret,
            callbackURL: keys.facebookAuth.callbackURL,
            profileFields: ['id', 'email', 'first_name', 'last_name'],
        },
        function(token, refreshToken, profile, done) {
            process.nextTick(function() {
                User.findOne({ 'facebook.id': profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = new User();
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if there is already a user with that email
                    if (user) {
                        return done(null, false, {message: 'That email is already taken.'});
                    }
                    else {

                        // if there is no user with that email
                        // create the user
                        var newUser            = new User();

                        // set the user's local credentials
                        newUser.local.email    = email;
                        newUser.local.password = newUser.generateHash(password);

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

            });

        }));



}