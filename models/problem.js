var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var problemSchema = new Schema({
  name: { type: String },
  statement: { type: String },
  sample_test_case: { input: String, output: String },
  test_case: {
    input: { type: Schema.Types.ObjectId, ref: 'Text' },
    output: { type: Schema.Types.ObjectId, ref: 'Text' }
  }
});


problemSchema
  .virtual('url')
  .get(function () {
    return '/problems/' + this._id;
  });

module.exports = mongoose.model("Problem", problemSchema);
