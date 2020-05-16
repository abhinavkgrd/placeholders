const Submission = require('../models/submission');
const Problem = require('../models/problem');
const User = require('../models/user');
const upload = require("../configs/multerConfig");
var helper = require("./helper");
var fs = require("fs");
var path = require('path');
var async= require("async");


// Display list of all Submissions.
exports.submission_list = function (req, res) {
    res.send('NOT IMPLEMENTED: Submission detail: ');
};
exports.user_submission_list = function (req, res) {
    res.send('NOT IMPLEMENTED: Submission detail: ' + req.params.uid);
};
exports.contest_submission_list = function (req, res) {
    res.send('NOT IMPLEMENTED: Submission detail: ' + req.params.cid);
};
exports.user_contest_submission_list = function (req, res) {
    res.send('NOT IMPLEMENTED: Submission detail: ' + req.params.cid + ' ' + req.params.uid);
};

// Display detail page for a specific Submission.
exports.submission_detail = function (req, res) {
    Submission.findOne({ _id: req.params.sid })
        .exec(function (err, submission) {
            if (err) { console.log(err); }
            //Successful, so render
            res.send(submission);
        });
};

// Display Submission create form on GET.
exports.submission_create_get = function (req, res) {
    res.render("submit-form", { pid: req.params.id });
};

// Handle Submission create on POST.
exports.submission_create_post = [
    upload.single("code_file"),
    function (req, res) {
        file = req.file;
        code = req.body.code;
        if (!file && !code)
            res.send("cant submit empty code");
        if (!file) {
            var filename = './public/uploads/code-' + Date.now() + '.cpp';
            console.log(filename);
            fs.writeFileSync(filename, code, function (err) {
                if (err)
                    console.log(err);
            });
            var file = {
                path: filename,
                mimetype: 'text/cpp'
            }
        }
        console.log(file);
        helper.createtext(file).then((codeid) => {
            var submission = {
                problem: req.body.pid,
                user: req.body.uid,
                code: codeid,
                status: 'AC'
            };
            Submission.create(submission, function (err, submission) {
                if (err) {
                    console.log(err);
                    return;
                }
                async.parallel([
                    (callback) => {
                        Problem.updateOne({_id:req.body.pid}, { $push: { submissions: [submission._id] } }, function (err,problem) {
                            if (err)
                                return callback(err);
                            callback(null);
                        });
                    },
                    (callback) => {
                        User.updateOne({_id:req.body.uid}, { $push: { submissions: [submission._id] } }, function (err,user) {
                            if (err)
                                return callback(err);
                            callback(null);
                        });
                    }
                ], function (err) {
                    if (err)
                        console.log(err);
                    else
                        res.redirect(submission.url);

                });
            });
        });
    }];

// Display Submission update form on GET.
exports.submission_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Submission update: ' + req.params.pid + req.params.sid);

};



/*

*/