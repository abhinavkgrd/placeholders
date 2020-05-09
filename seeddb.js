#! /usr/bin/env node

console.log("Seeddb start");

var userArgs = process.argv.slice(2);

var async = require("async");
var Problem = require("./models/problem");
var Submission = require("./models/submission");
var User = require("./models/user");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var problems = [];
var submissions = [];
var users = [];

function problemCreate(name, statement, testCase, cb) {
  problem_details = { name: name, statement: statement, testCase: testCase };

  var problem = new Problem(problem_details);

  problem.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New problem: " + problem);
    problems.push(problem);
    cb(null, problem);
  });
}

function submissionCreate(problem, user, code, status, cb) {
  submissiondetails = {
    problem: problem,
    user: user,
    code: code,
    status: status,
    time: Date.now(),
  };
  var submission = new Submission(submissiondetails);
  submission.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New submission: " + submission);
    submissions.push(submission);
    cb(null, submission);
  });
}

function userCreate(fname, lname, cb) {
  userdetails = {
    first_name: fname,
    last_name: lname,
  };
  var user = new User(userdetails);
  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New user: " + user);
    users.push(user);
    cb(null, user);
  });
}
function problems_create(cb) {
  async.parallel(
    [
      function (callback) {
        problemCreate(
          "TEST - Life, the Universe, and Everything",
          "Your program is to use the brute-force approach in order to find the Answer to Life, the Universe, and Everything. More precisely... rewrite small numbers from input to output. Stop processing input after reading in the number 42. All numbers at input are integers of one or two digits.",
          [["1\n2\n88\n42\n99", "1\n2\n88\n"],],
          callback
        );
      },
      function (callback) {
        problemCreate(
          "ADDREV - Adding Reversed Numbers",
          "The Antique Comedians of Malidinesia prefer comedies to tragedies. Unfortunately, most of the ancient plays are tragedies. Therefore the dramatic advisor of ACM has decided to transfigure some tragedies into comedies. Obviously, this work is very hard because the basic sense of the play must be kept intact, although all the things change to their opposites. For example the numbers: if any number appears in the tragedy, it must be converted to its reversed form before being accepted into the comedy play",
          [["3\n24 1\n4358 754\n305 794", "34\n1998\n1"],],
          callback
        );
      },
    ],
    cb
  );
}
function users_create(cb) {
  async.parallel(
    [
      function (callback) {
        userCreate("abhinav", "kumar", callback);
      },
      function (callback) {
        userCreate("rahul", "kumar", callback);
      },
      function (callback) {
        userCreate("rohit", "kumar", callback);
      },
    ],
    cb
  );
}
function submission_create(cb) {
  async.parallel(
    [
      function (callback) {
        submissionCreate(
          problems[0],
          users[0],
          "sadsadasdasdsadasd",
          "AC",
          callback
        );
      },
      function (callback) {
        submissionCreate(
          problems[1],
          users[0],
          "sadsadasdasdsadasd",
          "TLE",
          callback
        );
      },
      function (callback) {
        submissionCreate(
          problems[0],
          users[2],
          "sadsadasdasdsadasd",
          "WA",
          callback
        );
      },
      function (callback) {
        submissionCreate(
          problems[1],
          users[1],
          "sadsadasdasdsadasd",
          "RE",
          callback
        );
      },
    ],
    cb
  );
}

async.series(
  [problems_create, users_create, submission_create],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Solutions: " + submissions);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
