var express = require('express');
var router = express.Router();

var submission_controller= require("../controllers/submissionController");
const {loggedIn}  = require('../controllers/helper');

router.use(loggedIn);

router.post('/submit',submission_controller.submission_create_post);

router.post('/:sid/update',submission_controller.submission_update_post);

router.get('/:sid',submission_controller.submission_detail);

module.exports = router;