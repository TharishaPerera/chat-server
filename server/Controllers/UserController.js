const userModel = require("../Models/User");

const validator = require("validator");
const jwt = require("jsonwebtoken");

const generateToken = (_id, username, email, role) => {
    const jwtKey = process.env.JWT_SECRET

    return jwt.sign({
        _id,
        username,
        email,
        role
    }, jwtKey, {
        expiresIn: "1d"
    })

}

const registerUser = async (req, res) => {
    const { username, email, role } = req.body;
    const newUser = new userModel({
        username,
        email,
        role
    });
    try {
        // validate data
        if (!username || !email || !role) return res.status(400).json({ message: "All fields are required!" });
        if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email!" });

        // check user exists
        const userExists = await userModel.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists!" });

        const user = await newUser.save();
        const token = generateToken(user._id, user.username, user.email, user.role);

        res.status(200).json({_id: user._id, username: user.username, email: user.email, role: user.role, token: token});
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

const loginUser = async (req, res) => {
    const { email } = req.body;

    try {
        // validate data
        if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email!" });

        // check user
        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid user email or user does not exists!" });

        const token = generateToken(user._id, user.username, user.email, user.role);

        res.status(200).json({_id: user._id, username: user.username, email: user.email, role: user.role, token: token});
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

const findUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await userModel.findById(userId);
        if (!user) return res.status(400).json({ message: "User does not exists!" });

        res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

const findUserByEmail = async (req, res) => {
    const email = req.query.email;

    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).json({ message: "User does not exists!" });

        res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

const findAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();

        res.status(200).json(users);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

module.exports = { registerUser, loginUser, findUser, findUserByEmail, findAllUsers };