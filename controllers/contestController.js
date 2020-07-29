var Contest = require('../models/contest');
var { submission_listview } = require("./helper");
const upload = require("../configs/multer");


exports.contest_list = function (req, res) {
    Contest.find({}, function (err, contests) {
        if (err) { console.log(err); }
        //Successful, so render
        res.render('layout', { content: 'contest_list', list: contests });
    });
};

exports.contest_details = function (req, res) {
    submission_listview(req.params.cid).then((contest) => {
        console.log(contest);
        var problemSubmissioncnt= {};
        contest.problems.forEach((problem) => {
            problemSubmissioncnt[problem._id]=0;
        });
        contest.submissions.forEach((submission) => {
            // console.log(submission);
            problemSubmissioncnt[submission.problem._id]+=1;;
        });
        res.render('layout', { content: 'contest', contest: contest ,subcnt :problemSubmissioncnt});
    });
};

exports.leaderboard = function (req, res) {
    Contest.findOne({ _id: req.params.cid })
        .populate('user').exec()
    .then((contest)=>{
        res.render('layout', { content: 'leaderboard', contest: contest});
    });
};

exports.contest_submission_list = function (req, res) {
    submission_listview(req.params.cid).then((contest) => {
        res.render('layout', { content: 'submission_list', contest: contest ,submissions:contest.submissions});
    });
};

exports.user_contest_submission_list = function (req, res) {
    submission_listview(req.params.cid).then((contest) => {
        var userSubmissions = [];
        contest.submissions.forEach((submission) => {
            if (submission.user._id == req.params.uid)
                userSubmissions.push(submission);
        });
        res.render('layout', { content: 'submission_list', contest: contest,submissions:userSubmissions});
    });
};

exports.problem_contest_submission_list = function (req, res) {
    submission_listview(req.params.cid).then((contest) => {
        var problemSubmissions = [];
        contest.submissions.forEach((submission) => {
            if (submission.problem._id == req.params.pid)
                problemSubmissions.push(submission);
        });
        res.render('layout', { content: 'submission_list', contest: contest,submissions:problemSubmissions});
    });
};


exports.contest_create_get = function (req, res) {
    res.render("contest-form-basic-details");
};

exports.contest_create_post = function (req, res) {
    var contest = {
        name: req.body.name,
        start_time: req.body.startTime,
        end_time: req.body.endTime
    }
    Contest.create(contest, function (err, contest) {
        if (err) { console.log(err); return; }
        res.redirect(contest.url + '/problems/update');
    });
};


exports.contest_problem_update_get = function (req, res) {
    res.render("contest-form-problems");
};

exports.contest_problem_update_post = [upload.any(), function (req, res) {
    var problems_list = req.body.problems;
    var update = { $push: { problems: { $each: problems_list } } };
    var options = { new: true, useFindAndModify: false };
    Contest.findByIdAndUpdate(req.params.cid, update, options, function (err, contest) {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect(contest.url);
    });
}];

exports.contest_user_register = function (req, res) {
    var userid = req.body.uid;

    Contest.updateOne({ _id: req.body.cid }, { $push: { users: userid } }, function (err, contest) {
        if (err) {
            return;
        }
        res.redirect(contest.url);
    });
}





