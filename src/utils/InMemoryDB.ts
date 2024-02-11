// @ts-nocheck
import {Post, PostUpdateData} from "../models/Post";

export class InMemoryDB {

    private static instance: InMemoryDB;
    private blogPosts: Map<number, Post> = new Map();

    private constructor() {}

    public static getInstance() {
        if (!InMemoryDB.instance) {
            InMemoryDB.instance = new InMemoryDB();
        }
        return InMemoryDB.instance;
    }

    addBlogPost(newPost: Post) {
        this.blogPosts.set(newPost.id, newPost);
    }

    deleteBlogPostById(postId: number) {
        this.blogPosts.delete(postId);
    }

    updateBlogPost(postId: number, updatedPostData: PostUpdateData) {
        let postToUpdate = this.getBlogPostById(postId) as Post;

        if (updatedPostData.title) {
            postToUpdate.title = updatedPostData.title;
        }
        if (updatedPostData.content) {
            postToUpdate.content = updatedPostData.content;
        }
        if (updatedPostData.imageURL) {
            postToUpdate.imageURL = updatedPostData.imageURL;
        }
    }

    getBlogPostById(postId: number) {
        return this.blogPosts.get(postId);
    }

    getAllBlogPosts() {
        const allBlogPosts : Array<Partial<Post>> = [];
        this.blogPosts.forEach((post: Post) => {
            const {id, title, imageURL} = post;
            allBlogPosts.push({id, title, imageURL})
        });
        return allBlogPosts;
    }
}
