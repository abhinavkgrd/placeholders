var express = require('express');
var router = express.Router();

var contest_controller= require("../controllers/contestController");
var submission_controller= require("../controllers/submissionController");


router.get("/",contest_controller.contest_list);

router.get("/:cid/leaderboard",contest_controller.leaderboard);

router.get("/:cid/submissions",submission_controller.contest_submission_list);

router.get("/:cid/submissions/:uid/",contest_controller.user_contest_submission_list);

router.get("/:cid",contest_controller.contest_details);

module.exports=router;


