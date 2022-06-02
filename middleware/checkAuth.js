const jwt = require("jsonwebtoken");
const HttpError = require("../models/HttpError");

module.exports = (req, res, next) => {
    //check headers to determine if valid token is attached
    try {
        const token = req.headers.authorization.split(" ")[1];
        //if there is no token
        if (!token) {
            throw new HttpError("Authentication failed (thrown)", 500);
        };
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        throw new HttpError("Authentication failed (auto)", 500);
    };
};