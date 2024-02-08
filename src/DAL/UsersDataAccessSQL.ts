import {UsersDataAccess} from "./DataAccess";
import {getClient} from "../utils/db-connect";
import {GoogleUser} from "../models/GoogleUser";
import {User} from "../models/User";

export class UsersDataAccessSQL implements UsersDataAccess {
    private client=  getClient();

    async add(newUser: GoogleUser): Promise<void> {
        const query = {
            text: 'INSERT INTO users(sub, name, picture, email) VALUES ($1, $2, $3, $4)',
            values: [newUser.sub, newUser.name, newUser.picture, newUser.email]
        };
        await this.client.query(query);
    }

    async delete(userId: number): Promise<void> {

    }

    async update(userId: number, updatedBlogUserData: Partial<GoogleUser>): Promise<void> {

    }

    async get(userId: string): Promise<GoogleUser> {
        const query = {
            text: 'SELECT * FROM users WHERE sub = $1',
            values: [userId]
        }
        const result = await this.client.query(query);
        if (result.rows[0]) {return result.rows[0]}
        else {throw new Error(`post with ID ${userId} does not exist!`)}
    }

    async getAll(): Promise<Array<Partial<User>>> {
        const query = {
            text: 'SELECT * FROM users'
        }
        const result = await this.client.query(query);

        return result.rows
    }
}