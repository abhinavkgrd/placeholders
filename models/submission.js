var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var submissionSchema = new Schema({
  problem: { type: Schema.Types.ObjectId, ref: 'Problem' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  code: { type: Schema.Types.ObjectId, ref: 'Text', require:true },
  status: { type: String, enum: ['AC', 'WA', 'TLE', 'RE','PENDING'] }
}, { timestamps: true});

submissionSchema
  .virtual('url')
  .get(function () {
    return '/submissions/' + this._id;
  });

  submissionSchema
  .virtual('short_id')
  .get(function () {
      return String(this._id).slice(-5);
  });
module.exports = mongoose.model('Submission', submissionSchema);

