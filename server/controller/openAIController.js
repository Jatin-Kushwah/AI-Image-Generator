const { Configuration, OpenAIApi } = require("openai");
const cloudinary = require("cloudinary").v2;
const Post = require("../models/Post");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const createImageController = async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });

        const image = aiResponse.data.data[0].b64_json;

        // Upload image to Cloudinary
        const cloudImg = await cloudinary.uploader.upload(
            `data:image/png;base64,${image}`,
            {
                folder: "aiImage",
            }
        );

        // Save to database
        const post = await Post.create({ photo: cloudImg.url });
        post.save();

        res.status(200).json({ post });
    } catch (error) {
        console.error(error);
        console.log(error.response);
        res.status(500).send(
            error?.response?.data?.error?.message || "Something went wrong"
        );
    }
};

const getSuggestionsController = async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt:
                prompt ||
                "Generate a random text prompt for DALL·E to produce an image. The prompt should provide details about the image's genre and style, such as whether it should be 4K, abstract, oil painting, watercolor, photo-realistic, modern, or black and white. Do not enclose your answer in quotation marks, and avoid using words like 'create,' 'draw,' or 'paint'.",
            max_tokens: 200,
            temperature: 0.8,
        });

        const responseText = response.data.choices[0].text;
        res.status(200).json({ suggestion: responseText });
    } catch (error) {
        console.error(error);
        res.status(500).send(
            error?.response?.data?.error?.message || "Something went wrong"
        );
    }
};

module.exports = {
    createImageController,
    getSuggestionsController,
};
