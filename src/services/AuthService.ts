import {signJWT} from "../utils/jwt-sign-verify";
import {GoogleUser} from "../models/GoogleUser";
import {UsersDataAccess} from "../DAL/DataAccess";
import {Credentials, OAuth2Client} from "google-auth-library";
import dotenv from "dotenv";
import {User} from "../models/User";

dotenv.config();

export class AuthService {
    usersDataAccess: UsersDataAccess
    constructor(usersDataAccess: UsersDataAccess) {
        this.usersDataAccess = usersDataAccess;
    }

    async receiveOAuthDataAndGenerateJWTToken(code: string) {
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.GOOOLE_AUTH_REDIRECT_URL
        )
        await this.getUserCredentialsFromGoogle(oAuth2Client, code);
        const userInfo = await this.getUserInfoFromGoogle(oAuth2Client.credentials.access_token!);
        console.log(userInfo);

        await this.addUserToDataBase(userInfo);
        const user = await this.usersDataAccess.get(userInfo.sub!);
        return signJWT<User>(user);
    }

    private async getUserCredentialsFromGoogle(oAuth2Client: OAuth2Client ,code: string) {
        const response = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(response.tokens as Credentials);
    }


    private async getUserInfoFromGoogle(access_token: string) {
        const response= await fetch(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
        );
        return await response.json();
    }

    private async addUserToDataBase(userInfo: GoogleUser) {
        try {
            await this.usersDataAccess.get(userInfo.sub);
        } catch(error) {
            await this.usersDataAccess.add(userInfo);
        }
    }

    async generateGoogleOAuthURL() {
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.GOOOLE_AUTH_REDIRECT_URL
        )

        return oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope:[
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile',
                'openid',
            ],
            prompt: "consent"
        })
    }

}
