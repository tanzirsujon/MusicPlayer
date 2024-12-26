import user from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { setLoggerHandler } from "../services/userServices.js";
export async function signInHandler(req, res) {

    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const saltRounds = 11; // Fixed typo
        const salt = await bcrypt.genSalt(saltRounds); // Awaited the async function
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new user({ username, email, password: hashedPassword });
        await newUser.save();


        res.redirect('/');
    } catch (error) {
        console.error(`Internal server error in sign-in: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }

}

export async function logInHandler(req, res) {
    try {
        const { username, password } = req.body;
        let playerUser = await user.findOne({
            username
        })
        if (!username) {
            return res.send('username or password is unvalid');
        }
        let ispassword = await bcrypt.compare(password, playerUser.password);
        if (!ispassword) {
            return res.send('username or password is unvalid');

        }
        let token = setLoggerHandler(user);
        res.cookie('jwt', token)

        res.redirect('/home');


    } catch (error) {
        console.log(`internal server in login ${error}`);

    }

}