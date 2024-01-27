import dotenv from "dotenv";
import express, {Request, Response} from "express";
import {OAuth2Client} from 'google-auth-library';
dotenv.config();


export const requestGoogleURLRouter = express.Router();

requestGoogleURLRouter.post('/', async function(req: Request, res:Response, next) {
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');

    const redirectURL = 'http://127.0.0.1:3001/oauth';
    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectURL
    )

    const authorizeURL = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope:"https://www.googleapis.com/auth/userinfo.profile openid",
        prompt: "consent"
    })

    res.json({url: authorizeURL})
}
)
