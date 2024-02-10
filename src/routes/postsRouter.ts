import express, {Request, Response} from "express";
import {PostsController} from "../controllers/PostsController";
import {PostsService} from "../services/PostsService";
import {PostsDataAccessSQL} from "../DAL/PostsDataAccessSQL";
import {UsersService} from "../services/UsersService";
import {UsersDataAccessSQL} from "../DAL/UsersDataAccessSQL";
import {authenticateToken} from "../middlewares/authenticateToken";
import multer from 'multer';
import {Storage} from "@google-cloud/storage";
import dotenv from 'dotenv';
import {v4 as uuidv4} from 'uuid';

dotenv.config();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req: Request, file, cb) => {
        const allowedMimeTypes = new Set([
            'image/jpeg',
            'image/png',
            'image/gif',
        ]);
        if (allowedMimeTypes.has(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
})

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: "C:/Users/ivans/School/blog-complete/backend-blog/cloudKeys.json"
});

const bucket = storage.bucket(process.env.IMAGE_BUCKET!);

// we need access to UsersService to attach the information of the creator of the post based on the id of the user
export const postsRouter = express.Router();
const blogPostsController =
    new PostsController(
        new PostsService(
            new PostsDataAccessSQL(),
            new UsersService(
                new UsersDataAccessSQL())
    ));


postsRouter.post('/', authenticateToken, upload.single('image'),
    async (req: Request, res: Response) =>
    {
        console.log("made it /posts");
        try {
            if (req.file) {
                console.log("File found, trying to to upload...");
                req.file.originalname = `${uuidv4()}-${req.file.originalname}`;
                const blob = bucket.file(req.file.originalname);
                const blobStream = blob.createWriteStream({
                });

                blobStream.on('error', (error) => {
                    console.error('Blob stream error:', error);
                    res.status(500).send('Upload failed');
                });

                blobStream.on("finish", async (evt: any) => {
                    console.log("finish evt", evt);
                    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                    console.log(publicUrl);
                    res.status(200).send("Success");
                });
                blobStream.end(req.file.buffer);
            } else {
                console.log("failed");
            }
        } catch (error) {
            res.status(500).send(error);
            }

    });


postsRouter.delete('/:id', authenticateToken,
    async (req: Request, res: Response) =>
        await blogPostsController.deletePost(req,res));

postsRouter.put('/:id', authenticateToken,
    async (req: Request, res: Response) =>
        await blogPostsController.updatePost(req,res));

postsRouter.get('/:id', async (req: Request, res: Response) =>
    await blogPostsController.getPost(req,res));

postsRouter.get('/', async (req: Request, res: Response) =>
    await blogPostsController.getAllPosts(req,res));





