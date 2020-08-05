var mongoose = require('mongoose');
require('dotenv').config();

var DBurl_cloud=process.env.mongoDB;
var DBurl_local ='mongodb://localhost:27017/placeholders';
var DBuri=DBurl_cloud||DBurl_local;

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(DBuri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to DB !!");
    }
    catch (e) {
        console.log(e);
        throw e;
    }
};
module.exports = InitiateMongoServer;