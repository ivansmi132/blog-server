import {User} from "./User";

export interface GoogleUser extends User {
    given_name?: string,
    family_name?: string,
    locale?: string,
    email_verified: boolean,
    hd?: string
}

