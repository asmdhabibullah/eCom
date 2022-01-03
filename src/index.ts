import { app } from './app';
import { connect } from "mongoose";

const dbConnect = async () => {
    try {
        const DB_URI = process.env.DATABASE_URI || "mongodb://localhost:27017/amazonclone";
        await connect(DB_URI);
        console.log("Library database connected successfully");
    } catch (error) {
        console.log(error);
    }
};

const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log(`Library app runing on: http://localhost:${port}`);
});

dbConnect();
