const Problem = require('../models/problem');
const Text = require("../models/text");

const multer = require('multer');

// const { body,validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');
// var async=require("async");


// multer setup

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'public/uploads');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1]);
    }
});





// Display list of all Problems.
exports.problem_list = function (req, res) {
    Problem.find({}, 'name', function (err, list_of_problems) {
        if (err) { console.log(err); }
        //Successful, so render
        res.render('problem_list', { title: 'Problems', problem_list: list_of_problems });
    });
};

// Display detail page for a specific Problem.
exports.problem_detail = function (req, res, next) {
    // Problem.findOne({ _id: req.params.pid })
    //     .select('name statement sample_test_case')
    //     .exec(function (err, problem) {
    //         if (err) { console.log(err); }
    //         //Successful, so render
    //         res.render('problem_detail', { title: problem.name, problem: problem });
    //     });
};


// Later

// Display Problem create form on GET.
exports.problem_create_get = function (req, res) {
    res.render('problem-form');
};

// Handle Problem create on POST.
exports.problem_create_post =
    function (req, res) {
        let upload = multer({ storage: storage, fileFilter: function(req, file, cb) {
            // Accept txt only
            if (!file.originalname.match(/\.txt/)) {
                req.fileValidationError = 'Only txt files are allowed!';
                return cb(new Error('Only txt files are allowed!'), false);
            }
            cb(null, true);
        }}).fields([{
            name: 'input_file', maxCount: 1
          }, {
            name: 'output_file', maxCount: 1
          }]);

        upload(req, res, function (err) {
            if (req.fileValidationError) {
                console.log(req.fileValidationError);
            }
            else if (!req.files) {
                console.log('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                console.log(err);
            }
            else if (err) {
                console.log(err);
            }
            const files = req.files;
            
        });
    };

// Display Problem delete form on GET.
exports.problem_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Problem delete GET');
};

// Handle Problem delete on POST.
exports.problem_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Problem delete POST');
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