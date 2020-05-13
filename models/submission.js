var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var submissionSchema = new Schema({
  timestamps: { createdAt: 'created_at' },
  problem: { type: Schema.Types.ObjectId, ref: 'Problem' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  code: { type: Schema.Types.ObjectId, ref: 'Text', required=true },
  status: { type: String, enum: ['AC', 'WA', 'TLE', 'RE'] }
});

submissionSchema
  .virtual('url')
  .get(function () {
    return '/submissions/' + this._id;
  });

module.exports = mongoose.model('Submission', submissionSchema);

