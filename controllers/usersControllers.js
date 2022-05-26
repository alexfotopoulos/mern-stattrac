const bcrypt = require("bcrypt")
const User = require("../models/User");
const jwt = require("jsonwebtoken")

//controller to register a new user
const register = async (req, res, next) => {
    let { username, password } = req.body
    const hash = await bcrypt.hash(password, 12)
    const newUser = new User({ username, password: hash })
    await newUser.save()
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY, { expiresIn: '1h' })
    res.json({ msg: "Registration succeeded", userId: newUser._id, token })
}

//controller to login an existing user
const login = async (req, res, next) => {
    let { username, password } = req.body
    const user = await User.findOne({ username })
    const validUser = await bcrypt.compare(password, user.password)
    if (validUser) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: '1h' })
        res.json({ msg: "Login succeeded", userId: user._id, token })
    } else {
        return res.json({ msg: "Invalid credentials" })
    }
}

//controller to logout
const logout = async (req, res, next) => {
    res.json({ msg: "user logged out" })
}

exports.register = register
exports.login = login
exports.logout = logout