const Post = require("../models/Post.js");

const getPostsController = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ posts });
    } catch (err) {
        res.status(500).json({
            message: "Fetching posts failed, please try again",
        });
    }
};

module.exports = {
    getPostsController,
};
