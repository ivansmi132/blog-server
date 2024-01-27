import {PostsService} from "../services/PostsService";
import {Request, Response} from "express";
import {QueryProps} from "../models/QueryProps";

export class PostsController {
    private postsService: PostsService;

    constructor(postsService: PostsService) {
        this.postsService = postsService;
    }

    async addPost(req: Request, res: Response): Promise<void> {
        const postData = req.body;
        console.log(req.body);
        try {
            await this.postsService.addPost(postData);
            res.status(201).send({message: `Post created successfully`});
        } catch (error) {
            console.log((error as Error).message);
            res.status(400).send((error as Error).message);
        }
    }

    async deletePost(req: Request, res: Response): Promise<void> {
        const postId = Number(req.params.id);
        try {
            await this.postsService.deletePost(postId);
            res.status(200).send({message: `Post ${postId} deleted successfully`});
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async updatePost(req: Request, res: Response): Promise<void> {
        const postId = Number(req.params.id);
        const updatedPostData = req.body;
        console.log(req.body);
        try {
            await this.postsService.updatePost(postId, updatedPostData);
            res.status(200).send({message: `Post ${postId} updated successfully`});
        } catch (error) {
            console.log((error as Error).message);
            res.status(400).send((error as Error).message);
        }
    }

    async getPost(req: Request, res: Response): Promise<void> {
        const postId = Number(req.params.id);
        try {
            const post = await this.postsService.getPost(postId);
            res.status(200).send(post);
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async getAllPosts(req: Request, res: Response) {
        const queryParams: QueryProps = req.query;
        const allBlogPosts = await this.postsService.getAllPosts(queryParams);
        res.status(200).send(allBlogPosts);
    }

}

