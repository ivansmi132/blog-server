import {NextFunction, Request, Response} from "express";
import dotenv from "dotenv";
import {verifyJWT} from "../utils/jwt-sign-verify";
import {User} from "../models/User";
dotenv.config();

/*
This is a middleware that parses the auth token cookie and extracts user information from it
Assigning attribute user to the express Request type is made possible by extending the Request
interface from the express library via declaration merging. See ../types/express.index.d.ts for more info
 */
export function authenticateToken(req: Request, res: Response, next: NextFunction) {

    const token = req.cookies.token;
    if (token == null) return res.sendStatus(401); // No token provided

    try {
        req.user = verifyJWT<User>(token);
        next();
    } catch (error) {
        return res.sendStatus(403); // Invalid token
    }
}