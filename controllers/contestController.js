var Contest = require('../models/contest');
var Problem = require('../models/problem');
var { submission_listview } = require("./helper");
const upload = require("../configs/multer");
var async = require('async');

exports.contest_list = function (req, res) {
    Contest.find({}, function (err, contests) {
        if (err) { console.log(err); }
        //Successful, so render
        res.render('layout', { content: 'contest/list', list: contests });
    });
};

exports.contest_details = function (req, res) {
    submission_listview(req.params.cid).then((contest) => {
        var problemSubmissioncnt = {};
        contest.problems.forEach((problem) => {
            problemSubmissioncnt[problem._id] = 0;
        });
        contest.submissions.forEach((submission) => {
            problemSubmissioncnt[submission.problem._id] += 1;;
        });
        res.render('layout', { content: 'contest/details', contest: contest, subcnt: problemSubmissioncnt });
    });
};

exports.problem_details_get = function (req, res) {
    async.parallel(
        [(callback) => {
            Contest.findById(req.params.cid)
                .exec(callback);
        },
        (callback) => {
            Problem.findById(req.params.pid)
                .exec(callback);
        }], function (err, result) {
            if (err) {
                console.log(err);
            }
            res.render('layout', { content: 'problem/details', contest: result[0], problem: result[1] });
        });
}
exports.leaderboard = function (req, res) {
    Contest.findOne({ _id: req.params.cid })
        .populate('users').exec()
        .then((contest) => {
            res.render('layout', { content: 'contest/leaderboard', contest: contest });
        });
};

// Display Submission create form on GET.
exports.submission_create_get = function (req, res) {
    Contest.findOne({ _id: req.params.cid })
        .populate({ path: 'problems', select: "name" }).exec()
        .then((contest) => {
            res.render('layout', { content: 'submission/form', contest: contest });
        });
};


exports.contest_submission_list = function (req, res) {
    submission_listview(req.params.cid).then((contest) => {
        res.render('layout', { content: 'submission/list', contest: contest, submissions: contest.submissions });
    });
};

exports.user_contest_submission_list = function (req, res) {
    submission_listview(req.params.cid).then((contest) => {

        var userSubmissions = contest.submissions.filter((submission) => {
            return submission.user._id.equals(req.user._id);
        });
        res.render('layout', { content: 'submission/list', contest: contest, submissions: userSubmissions });
    });
};

exports.problem_contest_submission_list = function (req, res) {
    submission_listview(req.params.cid).then((contest) => {
        var problemSubmissions = contest.submissions.filter((submission) => {
            return submission.problem._id.equals(req.params.pid);
        });
        res.render('layout', { content: 'submission/list', contest: contest, submissions: problemSubmissions });
    });
};


exports.contest_create_get = function (req, res) {
    res.render('contest/basic-details-form');
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
    res.render('layout', { content: "problem/add-form", contestid: req.params.cid });
};

exports.contest_problem_update_post = [upload.any(), function (req, res) {
    var problems_list = req.body.problems;
    console.log(problems_list);
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





