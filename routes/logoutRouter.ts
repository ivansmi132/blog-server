import express, {Request, Response} from "express";

export const logoutRouter = express.Router();

logoutRouter.get('/', (req: Request, res: Response) => {
    res.clearCookie("token");
    res.send("cookieCleared");
})