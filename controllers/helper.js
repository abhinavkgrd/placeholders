const Text = require("../models/text");
const fs = require("fs");

exports.createtext = async (file) => {
    var id = await Text.create({
        type: file.mimetype,
        data: fs.readFileSync(file.path)
    }).
    then((saved_file)=> {
            return saved_file._id;
    });
    fs.unlink(file.path, (err) => {
        if (err) {
            console.log(err);
        }
    });
    return id;
}