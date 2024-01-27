import {QueryProps} from "../models/QueryProps";

export interface DataAccess<T> {
    add(data: T): Promise<void>,
    delete(id: number): Promise<void>,
    update(id: number, updateData: Partial<T>): Promise<void>,
    get(id: number): Promise<T>,
    getAll(queryParams: QueryProps): Promise<[{ posts_number: number }, Partial<T>[]]>,
}
