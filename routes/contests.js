var express = require('express');
var router = express.Router();

var contest_controller= require("../controllers/contestController");
var submission_controller= require("../controllers/submissionController");


router.get("/",contest_controller.contest_list);

//create contest  with basic details
router.get("/create",contest_controller.contest_create_get);
router.post("/create",contest_controller.contest_create_post);

router.get("/:cid/leaderboard",contest_controller.leaderboard);

router.get("/:cid/submissions",contest_controller.contest_submission_list);


//submissions Problem routes
router.get('/:cid/problems/:pid/submit',submission_controller.submission_create_get);
router.get('/:cid/problems/:pid/submissions',contest_controller.problem_contest_submission_list);


//add/update problems in the contest
router.get("/:cid/problems/update",contest_controller.contest_problem_update_get);
router.post("/:cid/problems/update",contest_controller.contest_problem_update_post);


//user routes
router.post("/:cid/register/",contest_controller.contest_user_register);

router.get("/:cid/users/:uid/submissions",contest_controller.user_contest_submission_list);

router.get("/:cid",contest_controller.contest_details);

module.exports=router;


