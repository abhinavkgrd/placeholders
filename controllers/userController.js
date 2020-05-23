var User = require('../models/user');
var passport = require('passport');
const {loggedIn}  = require('./helper');

// Display list of all Users.
exports.user_list = function (req, res) {
    User.find({}, function (err, userlist) {
        if (err) { console.log(err); }
        //Successful, so render
        res.send(userlist);
    });
};

// Display detail page for a specific User.
exports.user_detail = [loggedIn, function (req, res) {
    User.findOne({ _id: req.params.uid })
        .exec(function (err, user) {
            if (err) { console.log(err); }
            //Successful, so render
            res.send(user);
        });
}];

exports.user_submission_list = function (req, res) {
    User.findOne({ _id: req.params.uid })
        .populate({
            path: 'submissions',
            populate: { path: 'problem', select: 'name' },
            populate: { path: 'user', select: 'username' }
        })
        .exec((err, user) => {
            if (err) { console.log(err); }
            //Successful, so render
            res.send(user.submissions);
        });
};
// Display User create form on GET.
exports.user_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: User create GET');
};

// Handle User create on POST.
exports.user_create_post = function (req, res) {
    var userdata = {
        firstname,
        lastname,
        email,
        username,
    } = req.body;
    var user = new User(userdata);
    User.register(user, req.body.password, function (err, user) {
        if (err) {
            res.status(400);
            res.json({
                success: false,
                message: "Your account could  not be saved.Error: ",
                err
            });
        } else {
            res.json({
                success: true,
                message: "Your account has  been saved"
            });
        }
    });
};

exports.user_login_get = function (req, res) {
    res.send('NOT IMPLEMENTED: User create GET');
};

// Handle User login on POST.
exports.user_login_post =
    function (req, res, next) {
        if (!req.body.username) {
            res.json({ success: false, message: "Username was not given" })
            return;
        }
        if (!req.body.password) {
            res.json({ success: false, message: "Password was not given" })
            return;
        }
        passport.authenticate('local', function (err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                return res.redirect(user.url);
            });
        })(req, res, next)
    };

exports.user_logout_post = function (req, res) {
    req.logout();
    res.redirect('back');
}




// Display User delete form on GET.
exports.user_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: User delete GET');
};

// Handle User delete on POST.
exports.user_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: User delete POST');
};

// Display User update form on GET.
exports.user_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: User update GET');
};

// Handle User update on POST.
exports.user_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: User update POST');
};