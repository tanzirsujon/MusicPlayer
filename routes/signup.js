import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { signInHandler } from "../controller/user.js";
const signUprouter = express.Router();

signUprouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'signup.html'));

})
signUprouter.post('/', signInHandler)


export default signUprouter;