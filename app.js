import express, { response } from "express";
import path from "path";
import conn from "./connection/connection.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


import signUprouter from "./routes/signup.js";
import logInrouter from "./routes/login.js";
import authHandler from "./middlleware/auth.js";
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import dotenv from "dotenv";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const port = process.env.PORT | 3000;
const url = process.env.DB_URL;
conn(url);
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/signup', signUprouter);
app.use('/', logInrouter);
app.get('/home', authHandler, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/api/songs', async (req, res) => {
    try {
        const songsDir = path.join(__dirname, 'public', 'songs');
        const files = await fs.readdir(songsDir);
        res.json(files.map(file => `/songs/${file}`));
    } catch (err) {
        console.error('Error reading songs directory:', err);
        res.status(500).json({ error: 'Unable to fetch songs' });
    }
});


app.listen(port, () => {
    console.log(`server is listening port ${port}`)
})