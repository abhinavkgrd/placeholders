var express = require('express');
var router = express.Router();

var submission_controller= require("../controllers/submissionController");

router.get('/',submission_controller.submission_list);

router.get('/:sid/update',submission_controller.submission_update_get);

router.get('/:sid',submission_controller.submission_detail);

module.exports = router;
  