import {PostsDataAccess} from "../DAL/DataAccess";
import {Post, PostData, PostUpdateData} from "../models/Post";
import {validatePostData, validatePostDataOnCreation} from "../utils/validations";
import {QueryProps} from "../models/QueryProps";
import {UsersService} from "./UsersService";
import {User} from "../models/User";

export class PostsService {
    private postDataAccess: PostsDataAccess;
    private usersService: UsersService;

    constructor(postDataAccess: PostsDataAccess, usersService: UsersService) {
        this.postDataAccess = postDataAccess;
        this.usersService = usersService;
    }

    async addPost(rawPostData: PostData, user: User): Promise<void> {
        console.log("user", user);
        try {
            validatePostDataOnCreation(rawPostData);
        } catch (error) {
            throw new Error(`Invalid post data: ${(error as Error).message}`)
        }

        const newPost = new Post(
            rawPostData.title,
            rawPostData.content,
            user.sub,
            rawPostData.image_url && rawPostData.image_url);

        console.log("new post created: ", newPost);

        await this.postDataAccess.add(newPost);
    }

    async deletePost(postId: number, user: User): Promise<void> {
        try {
            if (!user.is_admin) {
                throw new Error("Only admin can delete posts");
            }
            await this.postDataAccess.delete(postId);
        } catch (error) {
            throw new Error(`Unable to delete post ${postId}: ${(error as Error).message}`)
        }
    }

    async updatePost(postId: number, updatedPostData: PostUpdateData, user: User): Promise<void> {
        try {
            const post = await this.postDataAccess.get(postId);
            if (post.posted_by !== user.sub && !user.is_admin) {
                throw new Error("Only the creator of the post or an admin can update posts");
            }
            validatePostData(updatedPostData);
            await this.postDataAccess.update(postId, updatedPostData);
        } catch (error) {
            throw new Error(`Unable to update post ${postId}: ${(error as Error).message}`)
        }
    }

    async getPost(postId: number): Promise<Post> {
        try {
            const post =  await this.postDataAccess.get(postId);
            post.user = await this.usersService.getUser(post.posted_by!);
            return post;

        } catch (error) {
            throw new Error(`Unable to get post ${postId}: ${(error as Error).message}`)
        }
    }

    async getAllPosts(queryParams: QueryProps): Promise<{posts_number: number , posts: Partial<Post>[]}> {
        const retrievedPosts = await this.postDataAccess.getAll(queryParams);
        // we attach the post creator's info to each post
        const postsWithUserInfo =
            await Promise.all(
                retrievedPosts.posts.map(async post => {
                    const userData = await this.usersService.getUser(post.posted_by!);
                    return {...post, user: userData}
                })
            );
        return {posts_number: retrievedPosts.posts_number, posts: postsWithUserInfo};
    }
}