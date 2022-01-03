import express, { Request, Response } from "express";
import { successHandler, errorHandler } from "package.breezebd.com";
import { User } from "../models/user";

const router = express.Router();

router.put("/api/userTakenBooks/:userId", async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const userTakenBooks = await User.findOne({ id: userId }).populate("books");

        if (userTakenBooks) {
            return successHandler(res, 202, userTakenBooks);
        }
        // const updateBook = await Library.findOneAndUpdate(
        //     { id: bookId },
        //     {
        //         library: {
        //             taken: false, returnDate
        //         }
        //     });
    } catch (error) {
        return errorHandler(res, 500, "Server error!")
    }
});

export { router as userTakenBooks }