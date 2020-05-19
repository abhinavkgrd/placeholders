const Text = require("../models/text");
const fs = require("fs");
var Contest =require('../models/contest');

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
    var query=Contest.findOne({ _id: cid })
    .populate({
        path:'submissions',
        populate:[{ path: 'problem', select: 'name' }
         ,{ path: 'user', select: 'username' }]
    });
    return query.exec();
};