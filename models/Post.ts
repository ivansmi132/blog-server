import {User} from "./User";

export interface PostData {
    title: string;
    content: string;
    posted_by: string;
    image_url?: string;
}

export interface PostUpdateData {
    title?: string;
    content?: string;
    image_url?: string;
}

export class Post {
    public readonly creation_date: Date;
    public title: string;
    public content: string;
    public image_url: string = "";
    public id: number = NaN;
    public posted_by: string;
    public user?: User;

    constructor(title: string, content: string, posted_by: string,  image_url?: string) {
        this.title = title;
        this.content = content;
        this.posted_by = posted_by;
        image_url && (this.image_url = image_url);
        this.creation_date = new Date();
    }
}