import { rdsClint } from './middleware/index';
import express, { Request, Response } from "express";
import { successHandler, errorHandler } from "package.breezebd.com";
import { Library } from "../models/shop";

const router = express.Router();

router.get("/api/library/book/:bookId/:key", async (req: Request, res: Response) => {
    try {
        const { bookId, key } = req.params;

        // console.log("req.params", req.params);

        await Library.findOne({ id: bookId }).exec((err, doc) => {
            // console.log(err, docs);
            // const activeUsers = docs.filter(doc => doc.status === true);
            if (!err && doc) {
                rdsClint.setex(`${key}_${bookId}`, 3600, doc as any);
                return successHandler(res, 200, doc);
            }
            return errorHandler(res, 404, "Book not found!")
        });
    } catch (error) {
        return errorHandler(res, 500, "Server error")
    }
});

export { router as getBook }