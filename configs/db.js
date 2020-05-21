
var mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://dbuser:strongPass@cluster0-jn6qi.mongodb.net/Codeforces_clone_db?retryWrites=true&w=majority';
const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(mongoDB, {
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