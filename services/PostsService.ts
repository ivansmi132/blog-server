import {DataAccess} from "../DAL/DataAccess";
import {Post, PostData, PostUpdateData} from "../models/Post";
import {validatePostData, validatePostDataOnCreation} from "../utils/validations";
import {QueryProps} from "../models/QueryProps";

export class PostsService {
    private postDataAccess: DataAccess<Post>;

    constructor(postDataAccess: DataAccess<Post>) {
        this.postDataAccess = postDataAccess;
    }

    async addPost(rawPostData: PostData): Promise<void> {
        try {
            validatePostDataOnCreation(rawPostData);
        } catch (error) {
            throw new Error(`Invalid post data: ${(error as Error).message}`)
        }
        const newPost = new Post(rawPostData.title, rawPostData.content, rawPostData.posted_by, rawPostData.image_url && rawPostData.image_url);
        await this.postDataAccess.add(newPost);
    }

    async deletePost(postId: number): Promise<void> {
        try {
            await this.postDataAccess.delete(postId);
        } catch (error) {
            throw new Error(`Unable to delete post ${postId}: ${(error as Error).message}`)
        }
    }

    async updatePost(postId: number, updatedPostData: PostUpdateData): Promise<void> {
        try {
            validatePostData(updatedPostData);
            await this.postDataAccess.update(postId, updatedPostData);
        } catch (error) {
            throw new Error(`Unable to update post ${postId}: ${(error as Error).message}`)
        }
    }

    async getPost(postId: number): Promise<Post> {
        try {
            return await this.postDataAccess.get(postId);
        } catch (error) {
            throw new Error(`Unable to get post ${postId}: ${(error as Error).message}`)
        }
    }

    async getAllPosts(queryParams: QueryProps): Promise<[{ posts_number: number }, Partial<Post>[]]> {
        return await this.postDataAccess.getAll(queryParams);
    }
}