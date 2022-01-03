import { rdsClint } from './middleware/index';
import express, { Request, Response } from "express";
import { successHandler, errorHandler } from "package.breezebd.com";
import { Library } from "../models/shop";

const router = express.Router();

router.get("/api/library/books", async (req: Request, res: Response) => {
    try {
        // console.log("HI, I'm active user.");
        const { key } = req.body;
        await Library.find({}).exec((err, docs) => {
            // console.log(docs);
            // const activeUsers = docs.filter(doc => doc.status === true);
            if (!err && docs.length > 0) {
                rdsClint.setex(key, 86400, docs as any);
                return successHandler(res, 200, docs);
            }
            return errorHandler(res, 404, "Books not found!")
        });
    } catch (error) {

    }
});

export { router as getBooks }