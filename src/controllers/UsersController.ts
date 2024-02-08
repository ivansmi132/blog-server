import {Request, Response} from "express";
import {UsersService} from "../services/UsersService";

export class UsersController {
    private usersService: UsersService;

    constructor(usersService: UsersService) {
        this.usersService = usersService;
    }

    async addUser(req: Request, res: Response): Promise<void> {
        const userData = req.body;
        console.log(req.body);
        try {
            await this.usersService.addUser(userData);
            res.status(201).send({message: `User created successfully`});
            console.log("User created successfully!");
        } catch (error) {
            console.log((error as Error).message);
            res.status(400).send((error as Error).message);
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        const userId = Number(req.params.id);
        try {
            await this.usersService.deleteUser(userId);
            res.status(200).send({message: `User ${userId} deleted successfully`});
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        const userId = Number(req.params.id);
        const updatedUserData = req.body;
        console.log(req.body);
        try {
            await this.usersService.updateUser(userId, updatedUserData);
            res.status(200).send({message: `User ${userId} updated successfully`});
        } catch (error) {
            console.log((error as Error).message);
            res.status(400).send((error as Error).message);
        }
    }

    async getUser(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        try {
            const user = await this.usersService.getUser(userId);
            res.status(200).send(user);
            console.log("User retrieved successfully!");
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const allBlogUsers = await this.usersService.getAllUsers();
            res.status(200).send(allBlogUsers);
        } catch (err) {
            console.log("Failed to fetch all users", (err as Error).message);
        }
    }

}