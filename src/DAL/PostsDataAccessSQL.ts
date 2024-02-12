import {PostsDataAccess} from "./DataAccess";
import {Post, PostUpdateData} from "../models/Post";
import {getClient} from "../utils/db-connect";
import {QueryProps} from "../models/QueryProps";

export class PostsDataAccessSQL implements PostsDataAccess {
    private client=  getClient();

    async add(newPost: Post): Promise<Post> {

        const query = {
            text: 'INSERT INTO post(title, content, image_url, creation_date, posted_by)' +
                ' VALUES ($1, $2, $3, $4, $5) RETURNING *',
            values: [
                newPost.title,
                newPost.content,
                newPost.image_url,
                newPost.creation_date,
                newPost.posted_by]
        };

        const result = await this.client.query(query);
        return result.rows[0];
    }

    async delete(postId: number): Promise<void> {

        const query = {
            text: 'DELETE FROM post WHERE id = $1',
            values: [postId]
        }
        await this.client.query(query);
    }

    async update(postId: number, updatedBlogPostData: PostUpdateData): Promise<void> {

        let query = 'UPDATE post SET ';
        const updates: string[] = [];
        const values: (string | number)[] = [];

        Object.entries(updatedBlogPostData).forEach(([key, value], index) => {
            updates.push(`${key} = $${index + 1}`);
            values.push(value);
        });

        query += updates.join(', ') + ' WHERE id = $' + (values.length + 1);
        values.push(postId);

        const result = await this.client.query(query, values);
        if (result.rowCount === 0) {
            throw new Error(`Post with ID ${postId} not found`);
        }
    }

    async get(postId: number): Promise<Post> {

        const query = {
            text: 'SELECT * FROM post WHERE id = $1',
            values: [postId]
        }

        const result = await this.client.query(query);

        if (result.rows[0]) {
            return result.rows[0]
        }
        else {
            throw new Error(`post with ID ${postId} does not exist!`)
        }
    }

    /*
    It's a (fully functional) mess, I will refactor it asap :)
     */
    async getAll(queryParams: QueryProps): Promise<{ posts_number: number, posts: Partial<Post>[] }> {
        let { page, pageSize, search, type } = queryParams;

        page = page || "1";
        search = search ? '%' + search + '%' : "%";
        pageSize = pageSize || "5";
        type = type || "title";

        let initialPostIndex = (Number(page) - 1) * Number(pageSize);

        // Adjust the count query based on the type
        let countQueryText = 'SELECT COUNT(p.id) FROM post p';
        if (type === "user") {
            countQueryText += ' INNER JOIN users u ON p.posted_by = u.sub WHERE u.name ILIKE $1';
        } else { // Default to title search
            countQueryText += ' WHERE p.title ILIKE $1';
        }

        let postsCount = await this.client.query({
            text: countQueryText,
            values: [search]
        }).then(res => parseInt(res.rows[0].count, 10));

        // if requested page is out of range
        if (initialPostIndex >= postsCount) {
            return { posts_number: postsCount, posts: [] };
        }

        // Adjust the main query based on the type
        let queryText = 'SELECT p.id, p.title, p.image_url, p.creation_date, p.posted_by FROM post p';
        if (type === "user") {
            queryText += ' INNER JOIN users u ON p.posted_by = u.sub WHERE u.name ILIKE $1';
        } else { // Default to title search
            queryText += ' WHERE p.title ILIKE $1';
        }
        queryText += ' ORDER BY p.id LIMIT $2 OFFSET $3';

        const allPosts = await this.client.query({
            text: queryText,
            values: [search, pageSize, initialPostIndex]
        });

        return { posts_number: postsCount, posts: allPosts.rows };
    }


}