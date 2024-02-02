import {User} from "./User";

export interface GoogleUser extends User{
    give_name?: string,
    family_name?: string,
    locale?: string
}

