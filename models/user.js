var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String}
  // ,submissions: { type: Schema.Types.ObjectId, ref: "Solution" }
});

userSchema.virtual('username')
.get(function(){
    return String(first_name+'_'+last_name);
});

module.exports = mongoose.model('User',userSchema);

