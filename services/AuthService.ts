import {signJWT} from "../utils/jwt-sign-verify";
import {GoogleUser} from "../models/GoogleUser";
import {UsersDataAccess} from "../DAL/DataAccess";

export class AuthService {
    usersDataAccess: UsersDataAccess
    constructor(usersDataAccess: UsersDataAccess) {
        this.usersDataAccess = usersDataAccess;
    }

    async getUserData(access_token: string) {

        const response= await fetch(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
        );
        const data = await response.json();
        try {
            await this.usersDataAccess.get(data.sub);
        } catch(error) {
            await this.usersDataAccess.add(data);
        }

        console.log(data);
        return signJWT<GoogleUser>(data);
    }


}