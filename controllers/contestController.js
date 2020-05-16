var Contest =require('../models/contest');

exports.contest_list = function(req, res) {
    res.send('NOT IMPLEMENTED: contest list');
};

exports.leaderboard = function(req, res) {
    res.send('NOT IMPLEMENTED: contest list');
};

exports.contest_submission_list = function(req, res) {
    res.send('NOT IMPLEMENTED: contest list');
};
exports.user_contest_submission_list = function(req, res) {
    res.send('NOT IMPLEMENTED: contest list');
};
exports.contest_details = function(req, res) {
    res.send('NOT IMPLEMENTED: contest detail: ' + req.params.pid+ req.params.cid);
};
