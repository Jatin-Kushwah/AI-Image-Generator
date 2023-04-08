const router = require("express").Router();
const postController = require("../controller/PostController");

const { getPostsController, deleteImageController } = postController;

router.get("/", getPostsController);
router.delete("/", deleteImageController);

module.exports = router;
