var Contest = require('../models/contest');
var {submission_listview} = require("./helper");
const upload = require("../configs/multer");


exports.contest_list = function (req, res) {
    Contest.find({}, function (err, contests) {
        if (err) { console.log(err); }
        //Successful, so render
        res.send(contests);
    });
};

exports.contest_details = function (req, res) {
    Contest.find({ _id: req.params.cid }, function (err, contest) {
        if (err) { console.log(err); }
        //Successful, so render
        res.send(contest);
    });
};

exports.contest_problem_list = function (req, res) {
    Contest.findOne({ _id: req.params.cid })
        .populate({ path: 'problems', select: 'name' }).
        exec().then((contest) => {
            res.send(contest.problems);
        });
};

exports.leaderboard = function (req, res) {
    res.send('NOT IMPLEMENTED: leaderboard');
};

exports.contest_submission_list = function (req, res) {
    submission_listview(req.params.cid).then((contest) => {
        res.send(contest.submissions);
    });
};

exports.user_contest_submission_list = function (req, res) {
    submission_listview(req.params.cid).then((contest) => {
        var userSubmissions = [];
        contest.submissions.forEach(submission => {
            if (submission.user._id == req.params.uid)
            userSubmissions.push(submission);
        });
        res.send(userSubmissions);
    });
};

exports.problem_contest_submission_list = function (req, res) {
    submission_listview(req.params.cid).then((contest) => {
        var problemSubmissions = [];
        contest.submissions.forEach(submission => {
            if (submission.problem._id == req.params.pid)
                problemSubmissions.push(submission);
        });
        res.send(problemSubmissions);
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
        res.redirect(contest.url + '/update/problems');
    });
};


exports.contest_problem_update_get = function (req, res) {
    res.render("contest-form-problems");
};

exports.contest_problem_update_post = [upload.any(), function (req, res) {
    var problems_list = req.body.problems;
    // console.log(problems_list); 
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





