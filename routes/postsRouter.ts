import express, {Request, Response} from "express";
import {PostsController} from "../controllers/PostsController";
import {PostsService} from "../services/PostsService";
import {PostsDataAccessSQL} from "../DAL/PostsDataAccessSQL";

export const postsRouter = express.Router();
const blogPostsController = new PostsController(new PostsService(new PostsDataAccessSQL()));

postsRouter.post('/', async (req: Request, res: Response) =>
    await blogPostsController.addPost(req,res));

postsRouter.delete('/:id', async (req: Request, res: Response) =>
    await blogPostsController.deletePost(req,res));

postsRouter.put('/:id', async (req: Request, res: Response) =>
    await blogPostsController.updatePost(req,res));

postsRouter.get('/:id', async (req: Request, res: Response) =>
    await blogPostsController.getPost(req,res));

postsRouter.get('/', async (req: Request, res: Response) =>
    await blogPostsController.getAllPosts(req,res));





