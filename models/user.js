var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose'); 

var userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String },
  email: {type: String, required:true, unique:true}, 
  username: { type: String , required:true,unique:true},
  password: { type: String , required:true},
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

userSchema.plugin(passportLocalMongoose); 
module.exports = mongoose.model('User', userSchema);

