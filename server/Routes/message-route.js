const express = require("express");
const { createMessage, findMessages } = require("../Controllers/MessageController");
const router = express.Router()


router.post('/', createMessage);
router.get('/:chatId', findMessages)

module.exports = router