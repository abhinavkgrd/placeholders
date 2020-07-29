var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var contestSchema = new Schema({
    name: { type: String },
    problems: [{ type: Schema.Types.ObjectId, ref: "Problem" }],
    submissions: [{ type: Schema.Types.ObjectId, ref: "Submission" }],
    users: [{ type: Schema.Types.ObjectId, ref: "User"}],
    //change AC problems to score later
    start_time: Date,
    end_time: Date
});

contestSchema
    .virtual('url')
    .get(function () {
        return '/contests/' + this._id;
    });
contestSchema
    .virtual('code')
    .get(function () {
        return String(this._id).slice(-5);
    });

contestSchema
    .virtual('status')
    .get(function () {
        if (Date.now() < this.start_time)
            return "Upcoming";
        else if (Date.now() >= this.start_time && Date.now() < this.end_time)
            return "active";
        else
            return "Ended";
    });

module.exports = mongoose.model('Contest', contestSchema);

