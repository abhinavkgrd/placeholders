var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var contestSchema = new Schema({
    problems: [{ type: Schema.Types.ObjectId, ref: "Problem" }],
    users: [{details:{ type: Schema.Types.ObjectId, ref: "User" },score:{type:Number}}],
    start_time: Date,
    duration: Number
});

contestSchema
    .virtual('url')
    .get(function () {
        return '/contests/' + this._id;
    });

contestSchema
    .virtual('status')
    .get(function () {
        if(Date.now()<start_time)
            return "upcoming";
        else if(Date.now()>=start_time && Date.now()<=start_time+duration)
            return "active";
        else
            return "past";
    });

module.exports = mongoose.model('Contest', contestSchema);


