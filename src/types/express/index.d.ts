/*
Extending an open interface via declaration merging.
Check out ../.././node_modules/@types/express-serve-static-core/index.d.ts
 */

import {User} from "../../models/User";

export {}

declare global {
    namespace Express {
        export interface Request {
            user?: User;
        }
    }
}