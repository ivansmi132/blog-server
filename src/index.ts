import express from "express";
import {postsRouter} from "./routes/postsRouter";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {authRouter} from "./routes/authRouter";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
    origin: [
        "http://127.0.0.1:3000",
        "https://react-client-d2vl.onrender.com",
        "postgres://blog_db_1j4c_user:WkcI98YhwNXIXpfywi3ifawITOrJjpEd@dpg-cn57tmol6cac73c7ee40-a/blog_db_1j4c"
    ],
    credentials: true
}))

// Logging middleware
app.use(morgan('dev'));

app.use(express.json());

app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/posts", postsRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})