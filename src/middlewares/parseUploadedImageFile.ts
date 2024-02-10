import multer from "multer";
import {Request} from "express";

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

export const parseUploadedImageFile = upload.single('image');
