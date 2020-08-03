var User = require('../models/user');

var passport = require('passport');
var async = require("async");
var crypto = require('crypto');

const { mailer, loggedIn } = require('./helper');

// Display list of all Users.
exports.user_list = function (req, res) {
    User.find({}, function (err, userlist) {
        if (err) { console.log(err); }
        //Successful, so render
        //  res.send(userlist);
        res.render('layout', { content: 'user/ranking', users: userlist });
    });
};

// Display detail page for a specific User.
exports.user_detail = [loggedIn, function (req, res) {
    User.findOne({ _id: req.params.uid })
        .populate({
            path: 'submissions',
            populate: [{ path: 'problem', select: 'name' },
            { path: 'user', select: 'username' }]
        })
        .exec(function (err, user) {
            if (err) { console.log(err); }
            //Successful, so render
            res.render('layout', { content: 'user/profile', profile: user });
        });
}];


// Display User create form on GET.
exports.user_create_get = function (req, res) {
    res.render('layout', { content: 'user/register' });
};

// Handle User create on POST.
exports.user_create_post = function (req, res) {
    if (req.body.password != req.body.cpassword) {
        res.json({ success: false, message: "Password did not match" })
        return;
    }
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
            res.render('layout', { content: 'info', info: "Your account could  not be saved.Error: " + err });
        } else {
            req.login(user, function (err) {
                if (!err) {
                    res.redirect(user.url);
                } else {
                    console.log(err);
                }
            });

        }
    });
};

exports.user_login_get = function (req, res) {
    res.render('layout', { content: 'user/login' });
};

// Handle User login on POST.
exports.user_login_post = function (req, res, next) {

    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        console.log(info);
        if (!user) return res.render('layout', { content: 'info', info: info });
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            var redirectTo = req.session.redirectTo || '/';
            delete req.session.redirectTo;
            // is authenticated ?

            return res.redirect(redirectTo);
        });
    })(req, res, next)
};

exports.user_logout_get = function (req, res) {
    req.logout();
    res.redirect('/');
};


exports.user_forgotPass_get = function (req, res) {
    res.render('layout', { content: 'user/forgot-pass' });
};

exports.user_forgotPass_post = function (req, res) {
    async.waterfall([
        (done) => {
            crypto.randomBytes(20, function (err, buff) {
                var token = buff.toString('hex');
                done(err, token);
            });
        },
        (token, done) => {
            User.findOne({ "username": req.body.username }, function (err, user) {
                if (!user) {
                    return res.render('layout', { content: 'info', info: 'No account with that email address exists.' });
                }
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {

            var email = {
                to: user.email,
                from: 'admin@placeholder.com',
                subject: 'Password Reset Link',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/users/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            mailer.sendMail(email, function (err, info) {
                if (!err) {
                    return res.render('layout', { content: 'info', info: 'An e-mail has been sent to ' + user.email + ' with further instructions.' });
                }
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) console.log(err);
        res.redirect('/users/forgotPass');
    });
};
exports.user_resetPass_get = function (req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            return res.render('layout', { content: 'info', info: 'Password reset token is invalid or has expired.' });
        }
        res.render('layout', { content: 'user/reset', user: user });
    });
};
exports.user_resetPass_post = function (req, res) {
    async.waterfall([
        function (done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {
                    return res.render('layout', { content: 'info', info: 'Password reset token is invalid or has expired.' });
                }

                user.setPassword(req.body.password, function (err, user) {
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;
                    req.logIn(user, function (err) {
                        user.save();
                        done(err, user);
                    });
                });
            });
        },
        function (user, done) {
            var email = {
                to: user.email,
                from: 'passwordreset@demo.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            mailer.sendMail(email, function (err) {
                if (!err) return res.render('layout', { content: 'info', info: 'Success! Your password has been changed.' });
                done(err);
            });
        }
    ], function (err) {
        if (!err)
            res.redirect('/');
        console.log(err);
    });
};

// Handle User delete on POST.
exports.user_delete = function (req, res) {
    User.findByIdAndDelete(req.params.uid).exec((err) => {
        req.app.locals.user = {};
        if (err)
            res.send("delete failed");
        res.redirect("/");
    })
};

// Display User update form on GET.
exports.user_update_get = function (req, res) {
    User.findOne({ _id: req.params.uid }).exec((err, user) => {
        // console.log(user.firstname);
        if (err)
            console.log(err);

        res.render('layout', { content: 'user/update', user: user });
    });
};

// Handle User update on POST.
exports.user_update_post = function (req, res) {
    var userdata = {
        firstname,
        lastname,
        email,
        username,
    } = req.body;
    User.findOneAndUpdate({ _id: req.body.uid }, userdata, {
        new: true
    }, (err, user) => {
        if (err) {
            console.log(err)
            return;
        }
        if (req.body.password) {
            user.setPassword(req.body.password, function (err, user) {
                user.save();
                req.logIn(user, function (err) {
                    res.redirect(user.url);
                });
            });
        }
    });
};