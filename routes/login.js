import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { logInHandler } from "../controller/user.js";
const logInrouter = express.Router();

logInrouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));

})
logInrouter.post('/', logInHandler)


export default logInrouter;