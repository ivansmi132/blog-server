import {NextFunction, Request, Response} from "express";

export function validateJSON(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof SyntaxError) {
        const error = err as SyntaxError & {status?: number, message?: string}
        return res.status(400).send({ status: 400, message: error.message }); // Bad request
    }
    next(err);
}

