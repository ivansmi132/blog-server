import express, {Request, Response} from "express";
import {verifyJWT} from "../utils/jwt-sign-verify";
import dotenv from 'dotenv';

dotenv.config();

export const loginRouter = express.Router();

loginRouter.get('/', (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        const user = verifyJWT<User>(token);
        console.log(`User ${user.name} logged in`);
        res.status(200).send({name : user.name, picture_url: user.picture});
    } catch (err) {
        res.sendStatus(401);
    }
})

