import {AuthService} from "../services/AuthService";
import {Request, Response} from "express";
import dotenv from "dotenv";
dotenv.config();

export class AuthController {

    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    authenticateLogin(req: Request, res: Response) {
       res.status(200).json(req.user);
    }

    async authenticateLogout(req: Request, res: Response) {
        res.clearCookie("token", {
            httpOnly: true,
            path: "/",
            secure: true,
            sameSite: "none"

        });
        res.status(200).send("Logged out!");
    }

    async generateGoogleOAuthURL(req: Request, res: Response) {
        const authorizeURL = await this.authService.generateGoogleOAuthURL();
        res.json({url: authorizeURL});
    }

    async receiveGoogleOAuthData(req: Request, res: Response) {

        const code = req.query.code as string;

        try {
            const token = await this.authService.receiveOAuthDataAndGenerateJWTToken(code);
            res.cookie("token", token, {
                // can only be accessed by server requests
                httpOnly: true,
                // path = where the cookie is valid
                path: "/",
                // domain = what domain the cookie is valid on (omitted)
                // secure = only send cookie over https
                secure: true,
                // sameSite = only send cookie if the request is coming from the same origin
                sameSite: "none", // "strict" | "lax" | "none" (secure must be true)
                // maxAge = how long the cookie is valid for in milliseconds
                maxAge: 3600000, // 1 hour
            });

            res.redirect(302, process.env.REACT_URL!);
        } catch (err) {
            res.status(400).send(`Error with signing in with Google, ${(err as Error).message}`);
        }
    }
}