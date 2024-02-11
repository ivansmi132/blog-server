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
            const newPost = req.body;

            if (req.file) {
                newPost.image_url = await this.postsService.uploadFileToStorage(req.file);
            }

            const createdPost = await this.postsService.addPost(newPost, req.user!);
            res.status(201).send(createdPost);
            } catch (error) {
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

        try {
            if (req.file) {
                updatedPostData.image_url = await this.postsService.uploadFileToStorage(req.file);
            }

            await this.postsService.updatePost(postId, updatedPostData, req.user!);
            res.status(200).send({message: `Post ${postId} updated successfully`});
        } catch (error) {
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
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

}

