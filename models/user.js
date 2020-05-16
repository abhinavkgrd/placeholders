var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String },
  username: { type: String },
  password: { type: String },
  submissions: [{ type: Schema.Types.ObjectId, ref: "Submission" }]
});

userSchema.virtual('display_name')
  .get(function () {
    return String(first_name + ' ' + last_name);
  });

userSchema.virtual('url')
  .get(function () {
    return '/users/' + this._id;
  });


module.exports = mongoose.model('User', userSchema);

