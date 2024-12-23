import express, { response } from "express";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
const port = process.env.PORT | 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.send('hey i am music player');
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