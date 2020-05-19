var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var contestSchema = new Schema({
    name: {type:String},
    problems: [{ type: Schema.Types.ObjectId, ref: "Problem" }],
    submissions: [{ type: Schema.Types.ObjectId, ref: "Submission" }],
    users: [{ details: { type: Schema.Types.ObjectId, ref: "User" }, AC_problems: { type: Schema.Types.ObjectId, ref: "Problem" }}],
    start_time: Date,
    end_time: Date
});

contestSchema
    .virtual('url')
    .get(function () {
        return '/contests/' + this._id;
    });

contestSchema
    .virtual('status')
    .get(function () {
        if (Date.now() < start_time)
            return "upcoming";
        else if (Date.now() >= start_time && Date.now() < end_time)
            return "active";
        else
            return "past";
    });


contestSchema
    .virtual('status')
    .get(function () {
        return end_time - start_time;
    });

module.exports = mongoose.model('Contest', contestSchema);


