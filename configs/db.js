
var mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://dbuser:strongPass@cluster0-jn6qi.mongodb.net/Codeforces_clone_db?retryWrites=true&w=majority';
var DBurl_local ='mongodb://localhost:27017/placeholders';
const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(DBurl_local, {
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