var Contest =require('../models/contest');

exports.contest_list = function(req, res) {
    res.send('NOT IMPLEMENTED: contest list');
};

exports.contest_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: contest detail: ' + req.params.pid+ req.params.cid);
};
