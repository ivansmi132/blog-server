import express, {Request, Response} from "express";
import {PostsController} from "../controllers/PostsController";
import {PostsService} from "../services/PostsService";
import {PostsDataAccessSQL} from "../DAL/PostsDataAccessSQL";
import {UsersService} from "../services/UsersService";
import {UsersDataAccessSQL} from "../DAL/UsersDataAccessSQL";
import {authenticateToken} from "../middlewares/authenticateToken";
import {parseUploadedImageFile} from "../middlewares/parseUploadedImageFile";



// we need access to UsersService to attach the information of the creator of the post based on the id of the user
export const postsRouter = express.Router();
const blogPostsController =
    new PostsController(
        new PostsService(
            new PostsDataAccessSQL(),
            new UsersService(
                new UsersDataAccessSQL())
    ));


postsRouter.post('/', authenticateToken, parseUploadedImageFile,
    async (req: Request, res: Response) =>
        await blogPostsController.addPost(req, res));


postsRouter.delete('/:id', authenticateToken,
    async (req: Request, res: Response) =>
        await blogPostsController.deletePost(req,res));

postsRouter.put('/:id', authenticateToken, parseUploadedImageFile,
    async (req: Request, res: Response) =>
        await blogPostsController.updatePost(req,res));

postsRouter.get('/:id', async (req: Request, res: Response) =>
    await blogPostsController.getPost(req,res));

postsRouter.get('/', async (req: Request, res: Response) =>
    await blogPostsController.getAllPosts(req,res));





