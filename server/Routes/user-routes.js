const express = require("express");
const router = express.Router();

const { registerUser, loginUser, findUser, findAllUsers, findUserByEmail } = require("../Controllers/UserController");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", findAllUsers);
router.get("/find/:userId", findUser);
router.get("/find", findUserByEmail);

module.exports = router;