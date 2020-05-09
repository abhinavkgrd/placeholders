var express = require('express');
var router = express.Router();

var problem_controller= require("../controllers/problemController");
var user_controller= require("../controllers/userController");
var submission_controller= require("../controllers/submissionController");


// PROBLEM ROUTES

router.get('/create',problem_controller.problem_create_get);
router.post('/create',problem_controller.problem_create_post);

router.get('/:id/update',problem_controller.problem_update_get);
router.post('/:id/update',problem_controller.problem_update_post);

router.get('/:id/delete',problem_controller.problem_delete_get);
router.post('/:id/delete',problem_controller.problem_delete_post);

router.get('/:id',problem_controller.problem_detail);

router.get('/all',problem_controller.problem_list);


module.exports = router;
  