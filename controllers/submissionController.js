var Submission = require('../models/submission');
var Problem = require('../models/problem');

// Display list of all Submissions.
exports.submission_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Submission detail: ' + req.params.pid);
};
exports.user_submission_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Submission detail: ' + req.params.uid);
};
exports.contest_submission_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Submission detail: ' + req.params.cid);
};
exports.user_contest_submission_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Submission detail: ' + req.params.cid +' '+ req.params.uid);
};

// Display detail page for a specific Submission.
exports.submission_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Submission detail: ' + req.params.pid+ req.params.sid);
};

// Display Submission create form on GET.
exports.submission_create_get = function(req, res) {
    res.render("submit-form",{pid:req.params.id});
};

// Handle Submission create on POST.
exports.submission_create_post = function(req, res) {

};

// Display Submission update form on GET.
exports.submission_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Submission update: ' + req.params.pid+ req.params.sid);

};

