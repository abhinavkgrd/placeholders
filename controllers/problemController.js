const Problem = require('../models/problem');
const upload = require("../configs/multer");
const { createtext } = require("./helper");
// const { body,validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');
var async = require("async");
const { check } = require('express-validator');

// Display list of all Problems.
exports.problem_list = function (req, res) {
    Problem.find({}, 'name', function (err, problems_list) {
        if (err) { console.log(err); }
        //Successful, so render
        res.render('layout', { content: 'problem/list', list: problems_list });
    });
};

// Display detail page for a specific Problem.
exports.problem_detail = function (req, res, next) {
    Problem.findOne({ _id: req.params.pid }, (err, problem) => {
        if (err) { console.log(err); }
        //Successful, so render
        res.render('layout', { content: 'problem/details', problem: problem  ,contest:undefined });
    });
};

// Display Problem create form on GET.
exports.problem_create_get = function (req, res) {
    res.render('layout', { content: 'problem/create'});
};

// Handle Problem create on POST.
exports.problem_create_post = [
    upload.fields([{
        name: 'input_file', maxCount: 1
    }, {
        name: 'output_file', maxCount: 1
    }]), [check('statement').escape()],
    function (req, res) {
        if (!req.files) {
            console.log('Please select an text to upload');
        }
        const files = req.files;
        // console.log(files);
        async.parallel({
            input: savetext.bind(null, files.input_file[0]),
            output: savetext.bind(null, files.output_file[0])
        }, function (err, test_case) {
            // console.log(test_case);
            if (err) {
                console.log(err);
                return;
            }
            var problem = {
                name: req.body.name,
                statement: req.body.statement.replace(/(\r\n|\n|\r)/gm, "\\n"),
                sample_test: {
                    input: req.body.sin.replace(/(\r\n|\n|\r)/gm, "\\n"), output: req.body.sout.replace(/(\r\n|\n|\r)/gm, "\\n")
                },
                test_case: test_case
            };
            Problem.create(problem, function (err, problem) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.redirect(problem.url);
            });
        });
    }
]

function savetext(file, callback) {
    createtext(file).then((id) => {
        callback(null, id);
    })
}


// Later

// Display Problem delete form on GET.
exports.problem_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Problem delete GET');
};


// Display Problem update form on GET.
exports.problem_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Problem update GET');
};

// Handle Problem update on POST.
exports.problem_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Problem update POST');
};

/*
body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified.')
    .isAlphanumeric().withMessage('Name has non-alphanumeric characters.'),
    body('statment').isLength({ min: 1 }).trim().withMessage('Statment can\'t be blank'),
    body('sample_test_case.input').isLength({ min: 1 }).trim().withMessage('Sample test Case input required'),
    body('sample_test_case.output').isLength({ min: 1 }).trim().withMessage('Sample test Case output required'),

    sanitizeBody('name'),
    sanitizeBody('statement'),
    sanitizeBody('sample_test_case.input'),
    sanitizeBody('sample_test_case.output'),

*/