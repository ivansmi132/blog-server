import {QueryProps} from "../models/QueryProps";
import {Post} from "../models/Post";
import {User} from "../models/User";

interface DataAccess<T> {
    add(data: T): Promise<T>,
    delete(id: number): Promise<void>,
    update(id: number, updateData: Partial<T>): Promise<void>,
    get(id: number | string): Promise<T>,

}

export interface PostsDataAccess extends DataAccess<Post> {
    getAll(queryParams: QueryProps): Promise<{ posts_number: number, posts: Partial<Post>[] }>
}

export interface UsersDataAccess extends DataAccess<User> {
    getAll(): Promise<Array<Partial<User>>>
}


