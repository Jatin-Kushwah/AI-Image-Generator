const express = require("express");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const DbConnect = require("./DbConnect");
const openAiRouter = require("./routes/OpenAiRoute");
const postRouter = require("./routes/PostRoute");
dotenv.config("./.env");

const {
    PORT,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_SECTRET_KEY,
} = process.env;

// Configuration
cloudinary.config({
    cloud_name: `${CLOUDINARY_CLOUD_NAME}`,
    api_key: `${CLOUDINARY_API_KEY}`,
    api_secret: `${CLOUDINARY_SECTRET_KEY}`,
});

const app = express();

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(
    cors({
        origin: "http://localhost:3000" || process.env.CORS_ORIGIN,
    })
);

app.use("/api/post", postRouter);
app.use("/api/openai", openAiRouter);

app.get("/", (req, res) => {
    res.status(200).send("Hi from Server");
});

DbConnect();
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
