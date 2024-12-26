
import mongoose from "mongoose";

async function conn(url) {
    try {
        await mongoose.connect(url)
        console.log('server is connected');

    } catch (error) {
        console.log('there is a issues of connecting to db ');

    }

}

export default conn;