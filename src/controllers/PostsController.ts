import {PostsService} from "../services/PostsService";
import {Request, Response} from "express";
import {QueryProps} from "../models/QueryProps";

export class PostsController {
    private postsService: PostsService;

    constructor(postsService: PostsService) {
        this.postsService = postsService;
    }

    async addPost(req: Request, res: Response): Promise<void> {
        try {
            if(req.file) {
                const image_url = await this.postsService.uploadFileToStorage(req.file);
                const newPost = req.body;
                newPost.image_url = image_url;
                await this.postsService.addPost(newPost, req.user!);
                res.status(201).send("Success");
            }
        } catch (error) {
            console.log((error as Error).message);
            res.status(400).send((error as Error).message);
        }
    }

    async deletePost(req: Request, res: Response): Promise<void> {
        const postId = Number(req.params.id);
        try {
            await this.postsService.deletePost(postId, req.user!);
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
            await this.postsService.updatePost(postId, updatedPostData, req.user!);
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
        try {
            const allBlogPosts = await this.postsService.getAllPosts(queryParams);
            res.status(200).send(allBlogPosts);
        } catch (err) {
            console.log("Failed to fetch all posts", (err as Error).message);
        }
    }

}

