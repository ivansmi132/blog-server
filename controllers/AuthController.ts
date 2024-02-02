import {AuthService} from "../services/AuthService";
import {Request, Response} from "express";
import {verifyJWT} from "../utils/jwt-sign-verify";
import {User} from "../models/User";
import {Credentials, OAuth2Client} from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

export class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    async authenticateLogin(req: Request, res: Response) {
        try {
            const token = req.cookies.token;
            const user = verifyJWT<User>(token);
            console.log(`User ${user.name} logged in`);
            res.status(200).send({user});
        } catch (err) {
            res.sendStatus(401);
        }
    }

    async authenticateLogout(req: Request, res: Response) {
        res.clearCookie("token");
        res.send("cookieCleared");
    }

    async generateGoogleOAuthURL(req: Request, res: Response) {
        res.header('Referrer-Policy', 'no-referrer-when-downgrade');

        const redirectURL =
            'http://127.0.0.1:3001/auth/receive-google-oauth-data';
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

    async receiveGoogleOAuthData(req: Request, res: Response) {
        const code = req.query.code as string | undefined;

        try {
            const redirectURL =
                'http://127.0.0.1:3001/auth/receive-google-oauth-data';
            const oAuth2Client = new OAuth2Client(
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
                redirectURL
            )
            const response = await oAuth2Client.getToken(code!);
            await oAuth2Client.setCredentials(response.tokens as Credentials);
            const user = oAuth2Client.credentials;
            console.log('credentials', user);
            const token = await this.authService.getUserData(user.access_token!);
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
            res.redirect(302, 'http://127.0.0.1:3000');

        } catch (err) {
            console.log('Error with signing in with Google', (err as Error).message);
        }
    }
}