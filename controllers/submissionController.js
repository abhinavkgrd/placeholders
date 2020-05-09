var Submission = require('../models/submission');

// Display list of all Submissions.
exports.submission_list = function(req, res) {
    Submission.find({},'name')
    .populate('problem user')
    .exec(function(err, list_of_submissions){
        if (err) { return next(err); }
        //Successful, so render
        res.render('submission_list', { title: 'Submissions', submission_list: list_of_submissions });
        });
};

// Display detail page for a specific Submission.
exports.submission_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Submission detail: ' + req.params.id);
};

// Display Submission create form on GET.
exports.submission_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Submission create GET');
};

// Handle Submission create on POST.
exports.submission_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Submission create POST');
};

// Display Submission update form on GET.
exports.submission_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Submission update GET');
};
