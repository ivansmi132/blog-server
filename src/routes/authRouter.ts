import express, {Request, Response} from "express";
import {AuthController} from "../controllers/AuthController";
import {AuthService} from "../services/AuthService";
import {UsersDataAccessSQL} from "../DAL/UsersDataAccessSQL";
import {authenticateToken} from "../middlewares/authenticateToken";

export const authRouter = express.Router();

const authController =
    new AuthController(
    new AuthService(
        new UsersDataAccessSQL()
    ));

authRouter.get('/login', authenticateToken,
    (req: Request, res: Response) => {
        authController.authenticateLogin(req, res);
    }
);

authRouter.get('/logout', authenticateToken,
    async (req: Request, res: Response) => {
        await authController.authenticateLogout(req, res);
    }
);

authRouter.post('/request-google-oauth-screen',
    async (req: Request, res: Response) => {
        await authController.generateGoogleOAuthURL(req, res);
    }
);

authRouter.get('/receive-google-oauth-data',
    async (req: Request, res: Response) => {
        await authController.receiveGoogleOAuthData(req, res);
    }
);





