const Problem = require('../models/problem');
const Text = require("../models/text");
const fs = require("fs");
const multer = require('multer');
const upload=require("../configs/multerConfig");
// const { body,validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');
var async = require("async");

// Display list of all Problems.
exports.problem_list = function (req, res) {
    Problem.find({}, 'name', function (err, list_of_problems) {
        if (err) { console.log(err); }
        //Successful, so render
        res.send(list_of_problems);
    });
};

// Display detail page for a specific Problem.
exports.problem_detail = function (req, res, next) {
    Problem.findOne({ _id: req.params.pid })
        .select('name statement sample_test_case')
        .exec(function (err, problem) {
            if (err) { console.log(err); }
            //Successful, so render
            res.send(problem);
        });
};

// Display Problem create form on GET.
exports.problem_create_get = function (req, res) {
    res.render('problem-form');
};

// Handle Problem create on POST.
exports.problem_create_post =[
        upload.fields([{
            name: 'input_file', maxCount: 1
        }, {
            name: 'output_file', maxCount: 1
        }]),
        function (req, res) {
            if (!req.files) {
                console.log('Please select an text to upload');
            }
            const files = req.files;
            async.parallel({
                input: (callback) => {
                    Text.create({
                        type: files.input_file.mimetype,
                        data: fs.readFileSync(files.input_file[0].path)
                    }, function (err, input) {
                        if (err) {
                            console.log(err);

                        }
                        return callback(null, input._id);
                    });
                },
                output: (callback) => {
                    Text.create({
                        type: files.output_file.mimetype,
                        data: fs.readFileSync(files.output_file[0].path)
                    }, function (err, output) {
                        if (err) {
                            console.log(err);
                            return callback(err);
                        }
                        return callback(null, output._id);
                    });
                }
            }, function (err, test_case) {
                if (err) {
                    console.log(err);
                    return;
                }
                fs.unlink(files.output_file[0].path, (err) => {
                    if (err)
                        console.log(err);
                });
                fs.unlink(files.input_file[0].path, (err) => {
                    if (err)
                        console.log(err);
                });
                var problem = { 
                    name: req.body.name, 
                    statement: req.body.statement, 
                    sample_test_case:{
                        input: req.body.sin, output: req.body.sout},
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