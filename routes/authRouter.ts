import express, {Request, Response} from "express";
import {AuthController} from "../controllers/AuthController";
import {AuthService} from "../services/AuthService";
import {UsersDataAccessSQL} from "../DAL/UsersDataAccessSQL";

export const authRouter = express.Router();

const authController = new AuthController(new AuthService(new UsersDataAccessSQL()));
authRouter.get('/login', async (req: Request, res: Response) => {
    await authController.authenticateLogin(req, res);
})

authRouter.get('/logout', async (req: Request, res: Response) => {
    await authController.authenticateLogout(req, res);
})

authRouter.post('/request-google-oauth-screen', async (req: Request, res: Response) => {
    await authController.generateGoogleOAuthURL(req, res);
})

authRouter.get('/receive-google-oauth-data', async (req: Request, res: Response) => {
    await authController.receiveGoogleOAuthData(req, res);
})





