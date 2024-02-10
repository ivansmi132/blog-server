import express, { Request, Response } from 'express';
import {UsersController} from "../controllers/UsersController";
import {UsersService} from "../services/UsersService";
import {UsersDataAccessSQL} from "../DAL/UsersDataAccessSQL";

export const usersRouter = express.Router();

const usersController = new UsersController(new UsersService(new UsersDataAccessSQL()));

usersRouter.post('/', async (req: Request, res: Response) =>
    await usersController.addUser(req, res));
usersRouter.get('/:id', async (req: Request, res: Response) =>
    await usersController.getUser(req, res));
usersRouter.put('/:id', async (req: Request, res: Response) =>
    await usersController.updateUser(req, res));
usersRouter.delete('/:id', async (req: Request, res: Response) =>
    await usersController.deleteUser(req, res));
usersRouter.get('/', async (req: Request, res: Response) =>
    await usersController.getAllUsers(req, res));





