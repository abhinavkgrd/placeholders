var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var problemSchema = new Schema({
  name: { type: String, required: true },
  statement: { type: String, required: true },
  testCase: {
    type:[[String, String]],
     minItems: 1
  },
});

problemSchema.virtual("sample_case").get(function () {
  return this.test_case.slice[1];
});

problemSchema
.virtual('url')
.get(function () {
  return '/problems/' + this._id;
});

module.exports = mongoose.model("Problem", problemSchema);
