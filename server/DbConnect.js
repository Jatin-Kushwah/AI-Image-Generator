const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config("./.env");

module.exports = async () => {
    const { PASS } = process.env;
    const mongoUri = `mongodb+srv://jats:${PASS}@cluster0.ssujw6z.mongodb.net/?retryWrites=true&w=majority`;

    try {
        const connect = await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`DB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
