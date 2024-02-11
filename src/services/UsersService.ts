import {UsersDataAccess} from "../DAL/DataAccess";
import {User} from "../models/User";
import {GoogleUser} from "../models/GoogleUser";

export class UsersService {

    private userDataAccess: UsersDataAccess;

    constructor(userDataAccess: UsersDataAccess) {
        this.userDataAccess = userDataAccess;
    }

    async addUser(rawUserData: GoogleUser): Promise<void> {

        await this.userDataAccess.add(rawUserData);
    }

    async deleteUser(userId: number): Promise<void> {

        try {
            await this.userDataAccess.delete(userId);
        } catch (error) {
            throw new Error(`Unable to delete user ${userId}: ${(error as Error).message}`)
        }
    }

    async updateUser(userId: number, updatedUserData: Partial<User>): Promise<void> {

        try {
            await this.userDataAccess.update(userId, updatedUserData);
        } catch (error) {
            throw new Error(`Unable to update user ${userId}: ${(error as Error).message}`)
        }
    }

    async getUser(userId: string): Promise<User> {

        try {
            return await this.userDataAccess.get(userId);
        } catch (error) {
            throw new Error(`Unable to get user ${userId}: ${(error as Error).message}`)
        }
    }

    async getAllUsers() {

        try {
            return await this.userDataAccess.getAll();
        } catch (error) {
            throw new Error(`Unable to get all users: ${(error as Error).message}`)
        }

    }
}