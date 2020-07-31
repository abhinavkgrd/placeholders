var express = require('express');
var router = express.Router();

var user_controller= require("../controllers/userController");

router.get('/',user_controller.user_list);

router.get('/signup',user_controller.user_create_get);
router.post('/signup',user_controller.user_create_post);

router.get('/login',user_controller.user_login_get);
router.post('/login',user_controller.user_login_post);

router.post('/logout',user_controller.user_logout_post);

router.get('/forgotPass',user_controller.user_forgotPass_get);
router.get('/resetPass',user_controller.user_resetPass_get);
router.post('/resetPass',user_controller.user_resetPass_post);


router.get('/:uid/submissions',user_controller.user_submission_list);

router.get('/:uid/update',user_controller.user_update_get);
router.post('/:uid/update',user_controller.user_update_post);

router.get('/:uid/delete',user_controller.user_delete_get);

router.get('/:uid',user_controller.user_detail);

module.exports = router;
  