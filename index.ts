import express from "express";
import {postsRouter} from "./routes/postsRouter";
import {validateJSONMiddleware} from "./middlewares/validateJSONMiddleware";
import cors from 'cors';
import {requestGoogleURLRouter} from "./routes/requestGoogleURLRouter";
import {oauthRouter} from "./routes/oauthRouter";
import {loginRouter} from "./routes/loginRouter";
import cookieParser from 'cookie-parser';
import {logoutRouter} from "./routes/logoutRouter";

const app = express();
const port = 3001;

app.use(cors({
    origin: "http://127.0.0.1:3000",
    credentials: true
}))

app.use(express.json());

app.use(cookieParser());

app.use(validateJSONMiddleware);


app.use("/posts", postsRouter);
app.use('/oauth', oauthRouter);
app.use('/request', requestGoogleURLRouter);
app.use('/login', loginRouter);
app.use('/logout',logoutRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})