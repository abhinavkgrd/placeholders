var Problem = require('../models/problem');
var User = require("../models/user");
var Submission = require("../models/submission");
var async=require("async");
//index route

exports.index= function(req,res){
    async.parallel({
        problem_count: function(callback){
            Problem.countDocuments({},callback);
        }, 
        user_count: function(callback){
            User.countDocuments({},callback);
        }, 
        submission_count: function(callback){
            Submission.countDocuments({},callback);
        }
    }, function (err,results) {
            res.render('index',{title:'Site Home', error: err, data: results });
    });
}
// Display list of all Problems.
exports.problem_list = function(req, res) {
    Problem.find({},'name')
        .exec(function(err, list_of_problems){
            if (err) { return next(err); }
            //Successful, so render
            res.render('problem_list', { title: 'Problems', problem_list: list_of_problems });
          });
};

// Display detail page for a specific Problem.
exports.problem_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Problem detail: ' + req.params.id);
};

// Display Problem create form on GET.
exports.problem_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Problem create GET');
};

// Handle Problem create on POST.
exports.problem_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Problem create POST');
};

// Display Problem delete form on GET.
exports.problem_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Problem delete GET');
};

// Handle Problem delete on POST.
exports.problem_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Problem delete POST');
};

// Display Problem update form on GET.
exports.problem_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Problem update GET');
};

// Handle Problem update on POST.
exports.problem_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Problem update POST');
};