var Contest =require('../models/contest');

exports.contest_list = function(req, res) {
    Contest.find({}, function (err, contests) {
        if (err) { console.log(err); }
        //Successful, so render
        res.send(contests);
    });
};

exports.contest_problem_list = function(req, res){
    Contest.find({_id:cid})
    .populate({path:'problems',select:'name'})
    .exec(function(err,contest){
        if(err){return ;}
        res.send(contest.problems);
    });
};

exports.leaderboard = function(req, res) {
    res.send('NOT IMPLEMENTED: contest list');
};

exports.contest_submission_list = function(req, res) {
    res.send('NOT IMPLEMENTED: contest list');
};
exports.user_contest_submission_list = function(req, res) {
    res.send('NOT IMPLEMENTED: contest list');
};
exports.contest_details = function(req, res) {
    Contest.find({_id:cid}, function (err, contests) {
        if (err) { console.log(err); }
        //Successful, so render
        res.send(contests);
    });
};

exports.contest_create_get =function(req,res){
    res.send('NOT IMPLEMENTED: Contest create GET');
};

exports.contest_create_post =function(req,res){
    var contest ={
        name:req.body.name,
        start_time:req.body.startTime,
        end_time:req.body.endTime
    }
    Contest.create(contest,function(err,contest){
        if(err){console.log(err); return;}
        res.redirect(contest.url+'/update/problems');
    });
};


exports.contest_problem_update_get =function(req,res){
    res.send('NOT IMPLEMENTED: Contest problem update GET');
};

exports.contest_problem_update_post =function(req,res){
    var problems_list=req.post.problems;
    
    Contest.updateOne({ _id: req.body.cid }, { $push: { problems: problems_list } }, function (err, problem) {
        if (err){
            return ;
        }
        res.redirect(contest.url);
    });
};

exports.contest_user_register = function(req,res){
    var userid=req.params.uid;
    
    Contest.updateOne({ _id: req.body.cid }, { $push: { users: userid } }, function (err, problem) {
        if (err){
            return ;
        }
        res.redirect(contest.url);
    });
}





