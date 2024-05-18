const messageModel = require("../Models/Message");

const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;

    const message = new messageModel({
        chatId,
        senderId,
        text
    });
    try {
        const savedMessage = await message.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

const findMessages = async (req, res) => {
    const chatId = req.params.chatId;

    try {
        const messages = await messageModel.find({ chatId }).populate("senderId", 'username email role');
        res.status(200).json(messages);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

module.exports = { createMessage, findMessages }