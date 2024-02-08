import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();


export const verifyJWT = <T extends object>(token: string): T => {
    return jwt.verify(token, process.env.JWT_SECRET!) as T;
};

export const signJWT = <T extends object>(payload: T): string => {
    return jwt.sign(payload, process.env.JWT_SECRET!);
};

