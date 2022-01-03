import express, { Request, Response } from "express";
import { successHandler, errorHandler } from "package.breezebd.com";
import { Library } from "../models/shop";

const router = express.Router();

router.put("/api/returnBook/:bookId", async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const {
            returnDate, userId
        } = req.body;

        // const user = await User.findOne({ id: userId });
        // const book = await Library.findOne({ id: bookId });

        const updateBook = await Library.findOneAndUpdate(
            { id: bookId },
            {
                library: {
                    taken: false, returnDate
                }
            });
        if (updateBook) {
            return successHandler(res, 202, updateBook);
        }
    } catch (error) {
        return errorHandler(res, 500, "Server error!")
    }
});

export { router as returnBook }