import {Storage} from "@google-cloud/storage";
import dotenv from "dotenv";

dotenv.config();

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.KEY_FILEPATH
});

export const bucket = storage.bucket(process.env.IMAGE_BUCKET!);