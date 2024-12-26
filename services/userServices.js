import jwt from "jsonwebtoken";
const secretKey = "@jijur$ujon19"
export function setLoggerHandler(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secretKey)
}
export function getLoggerHandler(token) {
    return jwt.verify(token, secretKey);
}

