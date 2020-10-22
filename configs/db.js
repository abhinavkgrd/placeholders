var mongoose = require("mongoose");
require("dotenv").config();

var DBurl = process.env.mongoDB_URL;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(DBurl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};
module.exports = InitiateMongoServer;
