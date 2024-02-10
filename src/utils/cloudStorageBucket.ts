import {Storage} from "@google-cloud/storage";
import dotenv from "dotenv";

dotenv.config();

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: "C:/Users/ivans/School/blog-complete/backend-blog/cloudKeys.json"
});

export const bucket = storage.bucket(process.env.IMAGE_BUCKET!);