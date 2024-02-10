import {PostsDataAccess} from "../DAL/DataAccess";
import {Post, PostData, PostUpdateData} from "../models/Post";
import {validatePostData, validatePostDataBeforeCreation} from "../utils/validations";
import {QueryProps} from "../models/QueryProps";
import {UsersService} from "./UsersService";
import {User} from "../models/User";
import {v4 as uuidv4} from "uuid";
import dotenv from "dotenv";
import {bucket} from "../utils/cloudStorageBucket";

dotenv.config();

export class PostsService {
    private postDataAccess: PostsDataAccess;
    private usersService: UsersService;

    constructor(postDataAccess: PostsDataAccess, usersService: UsersService) {
        this.postDataAccess = postDataAccess;
        this.usersService = usersService;
    }

    async uploadFileToStorage(file: Express.Multer.File): Promise<String> {
        console.log("File found, trying to to upload...");
        file.originalname = this.createUniqueName(file.originalname);
        const blob = bucket.file(file.originalname);

        return new Promise((resolve, reject) => {
            const blobStream = blob.createWriteStream({});

            blobStream.on('error', (error: Error) => {
                reject(new Error(`Upload failed: ${(error as Error).message}`));
            });

            blobStream.on("finish", async () => {
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                console.log("File uploaded!", publicUrl);
                resolve(publicUrl);
            });
            blobStream.end(file.buffer);
        })
    }

    createUniqueName(existingName: string) {
        return `${uuidv4()}-${existingName}`
    }

    async addPost(rawPostData: PostData, user: User): Promise<Post> {
        try {
            validatePostDataBeforeCreation(rawPostData);
        } catch (error) {
            throw new Error(`Invalid post data: ${(error as Error).message}`)
        }

        const newPost = new Post(
            rawPostData.title,
            rawPostData.content,
            user.sub,
            rawPostData.image_url && rawPostData.image_url);

        console.log("new post created: ", newPost);

        const post = await this.postDataAccess.add(newPost);
        post.user = await this.usersService.getUser(post.posted_by!);
        return post;
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