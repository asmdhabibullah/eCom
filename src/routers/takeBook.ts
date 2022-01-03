import express, { Request, Response } from "express";
import { successHandler, errorHandler } from "package.breezebd.com";
import { Library } from "../models/shop";
import { User } from "../models/user";

const router = express.Router();

router.put("/api/takeBook/:bookId", async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const {
            takenDate, returnDate, userId
        } = req.body;

        const user = await User.findOne({ id: userId });
        const book = await Library.findOne({ id: bookId });

        if (user && book) {
            book.library!.taken = true;
            book.library!.takenDate = takenDate;
            book.library!.returnDate = returnDate;
            book.library!.user = user as any;

            // const updateLibrary = await Library.findOneAndUpdate(
            //     { id: bookId },
            //     {
            //         library: {
            //             taken: true, takenDate, returnDate, user
            //         }
            //     });
            user.books?.push(book);
            await user?.save()
            // if (updateLibrary) {
            // }
            await book.save()
            return successHandler(res, 202, book);
        }
    } catch (error) {
        return errorHandler(res, 500, "Server error!")
    }
});

export { router as takeBook }