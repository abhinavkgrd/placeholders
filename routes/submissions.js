var express = require('express');
var router = express.Router();

var submission_controller= require("../controllers/submissionController");

router.get('/create',submission_controller.submission_create_get);
router.post('/create',submission_controller.submission_create_post);

router.get('/:id/update',submission_controller.submission_update_get);

router.get('/:id',submission_controller.submission_detail);

router.get('/all',submission_controller.submission_list);



module.exports = router;
  