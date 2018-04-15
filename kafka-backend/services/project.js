var Project = require('../models/Projects');
var Userbids = require('../models/UserBids');

function postProject(msg, callback){

    console.log("msg value",msg);
    var reqProjectName = msg.project.proName;
    var reqProjectDescription = msg.project.proDescr;
    var reqProjectRange = msg.project.proPayRange;
    var reqProjectOwner = msg.username;
    var reqProjectSkills = msg.project.proSkills;
    //var reqProjectFiles = msg.user.file;
    var res= {};
    var newProject = new Project();
    newProject.projectname = reqProjectName;
    newProject.projectdescription = reqProjectDescription;
    newProject.projectrange = reqProjectRange;
    newProject.projectowner = reqProjectOwner;
    newProject.projectskills = reqProjectSkills;


    newProject.save(function (err) {
        if(err){
            throw err;
            res.code = 401;
            res.value = "Failed to Post a Project";
            callback(null, res);
        }
        else{
            res.code = 201;
            res.value = "Posting a Project Successful";
            callback(null, res);
        }

    });

}



function allProjects(msg, callback) {
    res ={};
    console.log("All projects function :", msg);
    Project.find({}, function (err, projects) {
        console.log('all projects results', projects);
        if (err){
            throw err;
            res.code = 401;
            res.value = "unexpected error occured";

            callback(null, res);
        }
        else{
            if(projects.length > 0){

                res.code = 201;
                res.value = "All Projects";
                res.data = projects;
            }
            else{
                throw err;
                res.code = 401;
                res.value = "Failed to fetch"

            }

            callback(null,res);
        }
    } );

}

function getPostedProjects(msg, callback) {
    res = {};
    var username = msg.username;
    console.log("All projects function :", msg);
    Project.find({'projectowner': username}, function (err, projects) {
        console.log('posted projects results', projects);
        if (err) {
            throw err;
            res.code = 401;
            res.value = "Failed to Fetch";
            callback(null, res);
        }
        else {
            if (projects.length > 0) {
                res.code = 201;
                res.value = "All Projects";
                res.data = projects;
            }
            else {
                throw err;
                res.code = 401;
                res.value = "Failed to fetch"
            }
            callback(null, res);
        }

    });

}


function getProjectDetails(msg,callback){

    res ={};
    console.log("Project ID :", msg);
    Project.findOne({_id:msg.project}, function (err, projects) {
        console.log('Project ID Result: ', projects);
        if (err){
            throw err;
            res.code = 401;
            res.value = "Failed to Fetch";
            callback(null, res);
        }
        else if(projects){
                Userbids.find({'projectid':msg.project},function(err,bids){
                    if(err)
                        throw err;
                    if(bids.length>0){
                        console.log('bid results:',bids);
                        res.bids = bids;
                        res.code = 201;
                        res.value = " Project details";
                        res.data = projects;
                        callback(null,res);
                    }
                    else{
                        res.bids={};
                        res.code = 201;
                        res.value = " Project details";
                        res.data = projects;
                        callback(null,res);
                    }

                });

                console.log("Response sending to react backend: ", res.data , res.bids);
            }
            else{
                res.code = 401;
                res.value = "Failed to fetch"
                callback(null,res);

        }


    } );
}


function postBid(msg,callback){
    console.log("msg",msg);
    var res={};
    var username = msg.username;
    var projectid = msg.bid.projectid;
    var noofdays = msg.bid.Noofdays;
    var bidprice = msg.bid.BidPrice;
    var bidtime = new Date();
    console.log('date',bidtime);

    console.log("Inside postbid",msg);
    Userbids.find({$and:[{'biddername':username},{'projectid':projectid}]},function(err,userbids){
        if(err){
            throw err;
        }
        else if(userbids.length >0){
            console.log("userbids.length",userbids.length);
            Userbids.update({'biddername':username},{'bidprice':bidprice,'noofdays':noofdays, 'bidtime':bidtime},
                function(err){
                    if(err)
                        throw err;
                    else{
                        console.log("userbids created");
                        res.code=201;
                        res.message = "userbids update failed";
                        callback(null,res);
                    }
                });
        }
        else{
             var  newuserbids = new Userbids();
            newuserbids.biddername = username;
            newuserbids.projectid = projectid;
            newuserbids.bidprice = bidprice;
            newuserbids.noofbids = noofdays;
            newuserbids.bidtime = bidtime;
            newuserbids.save(function(err){
                if(err)
                    throw err
                else{
                    res.code = 201;
                    res.message= "userbid is added succesfully";
                    callback(null,res);
                }
            });
        }
    });


}


exports.getProjectDetails = getProjectDetails;
exports.allProjects = allProjects;
exports.postProject = postProject;
exports.getPostedProjects = getPostedProjects;
exports.postBid = postBid;