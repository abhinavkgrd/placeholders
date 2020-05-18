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

router.get("/:cid/problems",contest_controller.contest_problem_list);


//user registration
router.post("/:cid/register/:uid",contest_controller.contest_user_register);

//add/update problems in the contest
router.get("/:cid/update/problems",contest_controller.contest_problem_update_get);
router.post("/:cid/update/problems",contest_controller.contest_problem_update_post);


router.get("/:cid/submissions/:uid/",contest_controller.user_contest_submission_list);

router.get("/:cid",contest_controller.contest_details);



module.exports=router;


