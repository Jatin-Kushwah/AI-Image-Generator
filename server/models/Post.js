const mongoose = require("mongoose");

const Post = new mongoose.Schema({
    photo: { type: String },
});

module.exports = mongoose.model("post", Post);
