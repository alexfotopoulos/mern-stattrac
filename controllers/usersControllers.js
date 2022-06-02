const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/HttpError");


//controller to register a new user
const register = async (req, res, next) => {
    //destructure username and password and trim whitespace
    let { username, password } = req.body;
    username = username.trim();
    password = password.trim();

    //ensure username and password are provided
    if (!username || !password) {
        return next(new HttpError("Username and password are required", 500));
    };

    //ensure username is at least 4 characters
    if (username.length < 4) {
        return next(new HttpError("Username must be at least 4 characters", 500));
    };

    //ensure username is at least 4 characters
    if (password.length < 4) {
        return next(new HttpError("Password must be at least 4 characters", 500));
    };

    //search mongo for username
    let existingUser;
    try {
        existingUser = await User.findOne({ username });
    } catch (err) {
        return next(new HttpError("Registration failed. Try again later", 500));
    };

    //if username already exists
    if (existingUser) {
        return next(new HttpError("Username already exists. Please choose another username", 500));
    };

    //if username doesn't exist, create and save user
    let newUser;
    try {
        const hash = await bcrypt.hash(password, 12);
        newUser = new User({ username, password: hash });
        await newUser.save();
    } catch (err) {
        return next(new HttpError("Registration failed. Try again later", 500));
    };

    //if user is created, create token to login
    let token;
    try {
        token = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY, { expiresIn: "1h" });
    } catch (err) {
        return next(new HttpError("Registration failed. Try again later", 500));
    };

    //respond with userId and token
    res.status(201).json({ msg: "Registration succeeded", userId: newUser._id, token });
}

//controller to login an existing user
const login = async (req, res, next) => {
    //destructure username and password and trim whitespace
    let { username, password } = req.body;

    //variable to store user
    let existingUser;

    //locate user in mongo
    try {
        existingUser = await User.findOne({ username });
    } catch (err) {
        return next(new HttpError("Login failed. Try again later", 500));
    };

    //if user does not exist
    if (!existingUser) {
        return next(new HttpError("Invalid credentials. Login failed", 500));
    };

    //variable to store if password is valid
    let isValidPassword = false;

    //compare submitted and stored passwords
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        return next(new HttpError("Login failed. Try again later", 500));
    };

    //if submitted password is not valid
    if (!isValidPassword) {
        return next(new HttpError("Invalid credentials. Login failed", 500));
    };

    //if password is valid, create token to login
    let token;
    try {
        token = jwt.sign({ userId: existingUser._id }, process.env.JWT_KEY, { expiresIn: "1h" });
    } catch (err) {
        return next(new HttpError("Login failed. Try again later", 500));
    };

    //respond with userId and token
    res.json({ msg: "Login succeeded", userId: existingUser._id, token });
};


exports.register = register;
exports.login = login;