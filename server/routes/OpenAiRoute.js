const router = require("express").Router();
const openAiController = require("../controller/openAIController");

const { createImageController, getSuggestionsController } = openAiController;

router.post("/", createImageController);
router.get("/", getSuggestionsController);

module.exports = router;
