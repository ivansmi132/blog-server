import {PostsDataAccess} from "../DAL/DataAccess";
import {Post, PostData, PostUpdateData} from "../models/Post";
import {validatePostData, validatePostDataOnCreation} from "../utils/validations";
import {QueryProps} from "../models/QueryProps";
import {UsersService} from "./UsersService";

export class PostsService {
    private postDataAccess: PostsDataAccess;
    private usersService: UsersService;

    constructor(postDataAccess: PostsDataAccess, usersService: UsersService) {
        this.postDataAccess = postDataAccess;
        this.usersService = usersService;
    }

    async addPost(rawPostData: PostData): Promise<void> {
        try {
            validatePostDataOnCreation(rawPostData);
        } catch (error) {
            throw new Error(`Invalid post data: ${(error as Error).message}`)
        }
        const newPost = new Post(rawPostData.title, rawPostData.content, rawPostData.posted_by, rawPostData.image_url && rawPostData.image_url);
        console.log(newPost);
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

    async getAllPosts(queryParams: QueryProps): Promise<{posts_number: number , posts: Partial<Post>[]}> {
        const retrievedPosts = await this.postDataAccess.getAll(queryParams);
        const postsWithUserInfo = await Promise.all(retrievedPosts.posts.map(async post => {
            const userData = await this.usersService.getUser(post.posted_by!);
            return {...post, user: userData}
        }))
        return {posts_number: retrievedPosts.posts_number, posts: postsWithUserInfo};
    }
}