import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_KEY;
export function setLoggerHandler(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secretKey)
}
export function getLoggerHandler(token) {
    return jwt.verify(token, secretKey);
}

