var User = require('../models/user');

// Display list of all Users.
exports.user_list = function(req, res) {
        User.find({}, 'first_name', function (err, list_of_problems) {
            if (err) { console.log(err); }
            //Successful, so render
            res.send(list_of_problems);
        });
    };


// Display detail page for a specific User.
exports.user_detail = function(req, res) {
    User.findOne({ _id: req.params.uid })
    .exec(function (err, user) {
        if (err) { console.log(err); }
        //Successful, so render
        res.send(user);
    });
};

exports.user_submission_list = function(req, res) {
    res.send('NOT IMPLEMENTED: User list');
};
// Display User create form on GET.
exports.user_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User create GET');
};

// Handle User create on POST.
exports.user_create_post = function(req, res) {
    var user={
        first_name:req.body.fname,
        last_name:req.body.lname,
        username:req.body.uname,
        password:req.body.pass,
    }
    User.create(user,function(err,user){
        if(err){
            console.log(err);
            return ;
        }
        res.redirect(user.url);
    })
};

// Display User delete form on GET.
exports.user_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete GET');
};

// Handle User delete on POST.
exports.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete POST');
};

// Display User update form on GET.
exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User update GET');
};

// Handle User update on POST.
exports.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User update POST');
};