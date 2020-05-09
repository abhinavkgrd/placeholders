var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var submissionSchema = new Schema({
    problem:{type:Schema.Types.ObjectId, ref:'Problem', required:true},
    user:{type:Schema.Types.ObjectId, ref:'User', required:true},
    code :{type:String , required:true},
    time:{type:Date , required:true},
    status:{type:String ,required :true ,enum:['AC','WA','TLE','RE']}
});

submissionSchema
.virtual('url')
.get(function () {
  return '/submissions/' + this._id;
});

module.exports= mongoose.model('Submission', submissionSchema);

