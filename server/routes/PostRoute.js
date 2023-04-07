const router = require("express").Router();
const postController = require("../controller/PostController");

const { getPostsController } = postController;

router.get("/", getPostsController);

module.exports = router;
