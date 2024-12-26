import { getLoggerHandler } from "../services/userServices.js";

async function authHandler(req, res, next) {
    let userCookie = req.cookies.jwt
    if (!userCookie) {
        return res.redirect('/signup');
    }
    let user = getLoggerHandler(userCookie);
    if (!user) {
        return res.redirect('/');
    }
    req.user = user;
    next();

}
export default authHandler;