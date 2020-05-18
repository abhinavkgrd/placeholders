var express = require('express');
var router = express.Router();

var submissionsRouter = require('./submissions');

var problem_controller= require("../controllers/problemController");
var submission_controller= require("../controllers/submissionController");


// PROBLEM ROUTES

router.get('/',problem_controller.problem_list);


router.get('/create',problem_controller.problem_create_get);
router.post('/create',problem_controller.problem_create_post);


//submissions Related routes

router.get('/:pid/submit',submission_controller.submission_create_get);
router.get('/:pid/submissions',problem_controller.problem_submission_list);

// For Problem Setter

router.get('/:pid/update',problem_controller.problem_update_get);
router.post('/:pid/update',problem_controller.problem_update_post);

router.get('/:pid/delete',problem_controller.problem_delete_get);



router.get('/:pid',problem_controller.problem_detail);


module.exports = router;
  