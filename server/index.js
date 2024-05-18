const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./Routes/user-routes");
const chatRoutes = require("./Routes/chat-routes");
const messageRoutes = require("./Routes/message-route");

const app = express();

require("dotenv").config();

const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGODB_URL;

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {    
    res.send("Welcome to NutriKids Chat API!");
})

app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`);
})

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err.message);
})