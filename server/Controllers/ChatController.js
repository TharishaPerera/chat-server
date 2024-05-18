const chatModel = require("../Models/Chat");
const userModel = require("../Models/User");

const createChat = async (req, res) => {
    const { senderId, receiverId} = req.body

    try {
        const chat = await chatModel.findOne({
            members: { $all: [senderId, receiverId] }
        })

        if (chat) return res.status(400).json(chat);

        const newChat = new chatModel({
            members: [senderId, receiverId]
        })
        const savedChat = await newChat.save();
        res.status(200).json(savedChat);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

const findUsersChats = async (req, res) => {
    const userId = req.params.userId;

    try {
        const chats = await chatModel.find({
            members: { $in: [userId] }
        })

        res.status(200).json(chats);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}


const findChat = async (req, res) => {
    const { senderId, receiverId } = req.params;

    try {
        const chat = await chatModel.findOne({
            members: { $all: [senderId, receiverId] }
        })

        res.status(200).json(chat);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

module.exports = { createChat, findUsersChats, findChat }