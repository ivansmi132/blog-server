import {DataAccess} from "./DataAccess";
import {Post, PostUpdateData} from "../models/Post";
import {InMemoryDB} from "../utils/InMemoryDB";

export class PostsDataAccessInMemory implements DataAccess<Post> {
    private db = InMemoryDB.getInstance();

    async add(newBlogPost: Post): Promise<void> {
        await this.db.addBlogPost(newBlogPost);
    }

    async delete(postId: number): Promise<void> {
        const existingPost = await this.db.getBlogPostById(postId);
        if (!existingPost) {
            throw new Error(`Blog post with id ${postId} does not exist`);
        }
        await this.db.deleteBlogPostById(postId);
    }

    async update(postId: number, updatedBlogPostData: PostUpdateData): Promise<void> {
        const postToUpdate = this.db.getBlogPostById(postId);
        if (!postToUpdate) {
            throw new Error(`Update failed, Post with id ${postId} does not exist`);
        }
        await this.db.updateBlogPost(postId, updatedBlogPostData);
    }

    async get(postId: number): Promise<Post> {
        const post = await this.db.getBlogPostById(postId);
        if (!post) {
            throw new Error(`Post with id ${postId} does not exist`);
        }
        return post;
    }

    async getAll(): Promise<[{ posts_number: number }, Partial<Post>[]]> {
        const allPosts = await this.db.getAllBlogPosts();
        return [{ posts_number: allPosts.length}, allPosts];

    }

}