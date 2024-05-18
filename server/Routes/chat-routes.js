const express = require("express")
const router = express.Router()

const { createChat, findUsersChats, findChat } = require("../Controllers/ChatController")

router.post('/', createChat);
router.get('/:userId', findUsersChats)
router.get('/find/:firstId/:secondId', findChat)

module.exports = router