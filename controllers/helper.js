const Text = require("../models/text");
const fs = require("fs");
var Contest = require('../models/contest');
var nodemailer = require('nodemailer');

exports.createtext = async (file) => {
    var id = await Text.create({
        type: file.mimetype,
        data: fs.readFileSync(file.path)
    }).
        then((saved_file) => {
            return saved_file._id;
        });
    fs.unlink(file.path, (err) => {
        if (err) {
            console.log(err);
        }
    });
    return id;
}

exports.submission_listview = function (cid) {
    var query = Contest.findOne({ _id: cid })
        .populate([{ path: 'problems', select: 'name' }, {
            path: 'submissions',
            populate: [{ path: 'problem', select: 'name' }
                , { path: 'user', select: 'username' }]
        }]);
    return query.exec();
};
exports.loggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.session.redirectTo = req.originalUrl ;
        res.redirect('/users/login');
    }
};


exports.mailer = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: 'f0c25afafb2d19',
        pass: 'e8eac59a9f3d53'
    }
});
