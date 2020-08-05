const Submission = require('../models/submission');
const Problem = require('../models/problem');
const Contest = require('../models/contest');
const User = require('../models/user');
const upload = require("../configs/multer");
const ips = require("../configs/IP");
const { createtext } = require("./helper");
var fs = require("fs");
var async = require("async");
var axios = require('axios')

// Display detail page for a specific Submission.
exports.submission_detail = function (req, res) {
    Submission.findOne({ _id: req.params.sid })
        .populate([{ path: 'problem', select: 'name' }
            , { path: 'user', select: 'username' }
            , "code"])
        .exec().then((submission) => {
            // submission.code = submission.code.data.data.toString('utf8');
            console.log(submission.code);
            res.send(submission);
        });
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

        createtext(file).then((codeid) => {
            var submission = {
                problem: req.body.pid,
                user: req.user,
                code: codeid,
                status: 'PENDING'
            };
            Submission.create(submission, function (err, submission) {
                if (err) {
                    console.log(err);
                    return;
                }
                judge_solution(codeid, req.body.pid, submission._id);
                async.parallel([
                    (callback) => {
                        Contest.updateOne({ _id: req.body.cid }, { $push: { submissions: [submission._id] } }, function (err, problem) {
                            if (err)
                                return callback(err);
                            callback(null);
                        });
                    },
                    (callback) => {
                        User.updateOne({ _id: req.user }, { $push: { submissions: [submission._id] } }, function (err, user) {
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
exports.submission_update_post = function (req, res) {
    // console.log(req.body.status);
    Submission.updateOne({ _id: req.params.sid }, { $set: { status: req.body.status } }, (err) => {
        if (err)
            return res.send(err);
        res.send("updated");
    });
};

function judge_solution(codeid, pid, sid) {
    Problem.findById(pid).then((problem) => {
        var reqbody = {
            codeid: codeid,
            inpid: problem.test_case.input,
            outid: problem.test_case.output
        };
        // console.log(reqbody);
        axios.post(ips.coderunner + '/judge', reqbody).then((res) => {
            axios.post(ips.self + '/submissions/' + sid + '/update', { status: res.data }).then((res) => {
                console.log(res.data);
            });
        })
            .catch((err) => {
                console.error("judging server error");
            });
    });
}



