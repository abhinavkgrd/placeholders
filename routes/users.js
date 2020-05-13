var express = require('express');
var router = express.Router();

var user_controller= require("../controllers/userController");

router.get('/',user_controller.user_list);


router.get('/create',user_controller.user_create_get);
router.post('/create',user_controller.user_create_post);

router.get('/:uid/submissions',user_controller.user_submission_list);

router.get('/:uid/update',user_controller.user_update_get);
router.post('/:uid/update',user_controller.user_update_post);

router.get('/:uid/delete',user_controller.user_delete_get);

router.get('/:uid',user_controller.user_detail);

module.exports = router;
  