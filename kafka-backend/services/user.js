
var User = require('../models/User');
var bcrypt = require('bcryptjs');

var File = require('../models/Files');
var UserProfile = require('../models/UserProfile');

var UserLog = require('../models/UserLog');
var mongoose = require('mongoose');

function login(msg, callback){

    var res = {};
    var username=msg.username;
    var password=msg.password;


        User.findOne({$or: [{ 'local.email':  username },{'local.username': username}]}, function (err, user) {
            if(!user || !user.validPassword(password)){
                console.log('error');
                res.code = "401";
                res.value = "Failed Login";
                callback(null, res);
            }
            else {
                        console.log("login successful....");
                        console.log(user.local.email);
                        user.status = "201";
                        res.value = "Success Login";
                        callback(null, user);
                    }

                });

}

function getUserDetails(msg, callback){

    var res={}
    var email=msg.email;
    var userdetails={
        firstname: '',
        lastname: '',
        email: '',
        contactno: '',
        interests:'',
        lastlogin:'',
        files :[],
        filelog:[],
        grouplog:[]

    }

    User.findOne({'email': email}, function (err, user) {
        if (err) {
            throw err;

            res.code = "401";
            res.value = "Failed to get user details";
            callback(null, res);
        }
        else {

            File.find( {$or: [ {'owner': email, 'fileparent':''}, {'sharedlist': email}]} , function (err, filesArr) {

                if (err) {
                    throw err;

                    res.code = "401";
                    res.value = "Failed to get user details";
                    callback(null, res);
                }

                else {
                    UserLog.findOne({'user': email}, function (err, log) {


                        if (err) {
                            throw err;

                            res.code = "401";
                            res.value = "Failed to get user details";
                            callback(null, res);
                        }

                        if (!user) {

                            res.code = "401";
                            res.value = "Failed to get user details";
                            callback(null, res);
                        }
                        else {

                            userdetails.firstname = user.firstname;
                            userdetails.lastname = user.lastname;
                            userdetails.email = user.email;
                            userdetails.contactno = user.contactno;
                            userdetails.interests = user.interests;
                            userdetails.lastlogin = user.lastlogintime;
                            userdetails.filelog = log.filelog;
                            userdetails.grouplog = log.grouplog;
                            userdetails.files = filesArr;


                            res.code = "200";
                            res.value = {"userdetails": userdetails};
                            callback(null, res);
                            //res.send({"userdetails": userdetails, "status": 201});
                        }
                    });

                }


            });
        }

    });

}

function signup(msg, callback){

    var reqPassword = msg.user.password;
    console.log("msg value",msg);
    var reqUsername = msg.user.username;
    var reqEmail = msg.user.email;
    var  res= {};

    User.findOne({'local.username':reqUsername},function(err,user){
        if(err){
            throw err;
        }
        else if(user){
            res.status = 401;
            console.log("db user",user);
            res.message= 'This email already exists';
            callback(null,res);
            console.log("401 email");

        }
        else{
            var newUser = new User();

            newUser.local.id = reqUsername;
            newUser.local.email = reqEmail;
            newUser.local.username= reqUsername;

            console.log("new user save");

            bcrypt.hash(reqPassword,10,function (err,hash) {
                if(err){
                    res.status = 401;
                    res.message= 'password encryption failed';
                    callback(null,res);
                    console.log("encryption failed");
                }
                else{
                    newUser.local.password = hash;
                    newUser.save(function(err){
                        if(err)
                            throw err;
                        else{
                                console.log("user saved");
                                res.code = 201;
                                res.message= 'user saved successfully';
                                callback(null,res);
                        }

                    });
                }
            });

        }

    });


}

function updateUser(msg, callback) {

    var res={}
    var firstname = msg.user.firstname;
    var lastname = msg.user.lastname;
    var mobile = msg.user.mobile;
    var skills = msg.user.skills;
    var aboutme = msg.user.aboutme;
    var username = msg.username;

    var userProfile = new UserProfile();

    userProfile.firstname = firstname;
    userProfile.lastname = lastname;
    userProfile.mobile = mobile;
    userProfile.skills = skills;
    userProfile.aboutme = aboutme;
    userProfile.username = username;
    userProfile.imagepath = "thispath"

   // mongoose.connection.db.collection('userprofile').insert({firstname: firstname, lastname: lastname});

    UserProfile.findOne({'projectowner':username},function(err,user){
        if(err){
            throw err;
        }
        else if(user){
            UserProfile.update({'projectowner':username},{'firstname': firstname, 'lastname':lastname,
                'mobile':mobile, 'skills':skills, 'aboutme':aboutme}, function (err) {
                if(err){
                    throw err;
                }
                else
                {
                    res.code = 201;
                    res.message= "user profile updated successfully"
                    callback(null, res);
                }

            });

        }
        else{
            userProfile.save(function(err){
                if(err)
                    throw err;
                else{
                    console.log("user details saved");
                    res.code = 201;
                    res.message= 'user details successfully';
                    callback(null,res);
                }
            });
        }

    });


}


exports.updateUser = updateUser;
exports.signup = signup;
exports.getUserDetails = getUserDetails;
exports.login = login;