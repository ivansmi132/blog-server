import express from "express";
import {postsRouter} from "./routes/postsRouter";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {authRouter} from "./routes/authRouter";
import morgan from "morgan";

const app = express();
const port = 3001;

app.use(cors({
    origin: "http://127.0.0.1:3000",
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