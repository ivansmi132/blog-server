import dotenv from "dotenv";
import express, {Request, Response} from "express";
import {Credentials, OAuth2Client} from 'google-auth-library';
import {signJWT} from "../utils/jwt-sign-verify";

dotenv.config();

export const oauthRouter = express.Router();
async function getUserData(access_token: string) {
    const response= await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    console.log(data);
    return signJWT<User>(data);
}

oauthRouter.get('/', async function(req: Request, res: Response, next) {
    const code = req.query.code as string | undefined;

    try {
        const redirectURL = 'http://127.0.0.1:3001/oauth';
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectURL
        )
        const response = await oAuth2Client.getToken(code!);
        await oAuth2Client.setCredentials(response.tokens as Credentials);
        console.log('tokens acquired');
        const user = oAuth2Client.credentials;
        console.log('credentials', user);
        const token = await getUserData(user.access_token!);
        // req.session.user = {token};
        res.cookie("token", token, {
            // can only be accessed by server requests
            httpOnly: true,
            // path = where the cookie is valid
            path: "/",
            // domain = what domain the cookie is valid on
            // secure = only send cookie over https
            secure: false,
            // sameSite = only send cookie if the request is coming from the same origin
            sameSite: "strict", // "strict" | "lax" | "none" (secure must be true)
            // maxAge = how long the cookie is valid for in milliseconds
            maxAge: 3600000, // 1 hour
        });
        res.redirect(302, 'http://127.0.0.1:3000')

    } catch (err) {
        console.log('Error with signing in with Google', (err as Error).message);
    }
})
