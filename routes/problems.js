var express = require('express');
var router = express.Router();


var problem_controller= require("../controllers/problemController");
const {loggedIn}  = require('../controllers/helper');


// PROBLEM ROUTES

router.get('/',problem_controller.problem_list);

router.use(loggedIn);

router.get('/create',problem_controller.problem_create_get);
router.post('/create',problem_controller.problem_create_post);


// For Problem Setter

router.get('/:pid/update',problem_controller.problem_update_get);
router.post('/:pid/update',problem_controller.problem_update_post);

router.get('/:pid/delete',problem_controller.problem_delete_get);



router.get('/:pid',problem_controller.problem_detail);


module.exports = router;
  