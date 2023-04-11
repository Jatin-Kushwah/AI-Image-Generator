const Post = require("../models/Post.js");
const cloudinary = require("cloudinary").v2;

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

const deleteImageController = async (req, res) => {
    try {
        const { id } = req.body;

        // Find the post by id
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).send("Post not found");
        }

        // // Delete image from Cloudinary
        // const publicId = post.photo.match(/\/[^/]*$/)[0].substring(1);
        // await cloudinary.uploader.destroy(publicId);

        // Delete post from database
        await Post.deleteOne({ _id: id });

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        console.log(error.response);
        res.status(500).send(
            error?.response?.data?.error?.message || "Something went wrong"
        );
    }
};

module.exports = {
    getPostsController,
    deleteImageController,
};
