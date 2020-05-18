var mongoose = require("mongoose");
var Schema = mongoose.Schema;


const textSchema =new Schema({
    type: String,
    data: Buffer
});

module.exports = mongoose.model('Text', textSchema);
