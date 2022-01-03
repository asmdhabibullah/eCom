import express, { Request, Response } from "express";
import { successHandler, errorHandler } from "package.breezebd.com";
import { Library } from "../models/shop";

const router = express.Router();

router.put("/api/book/updateLibrary/:bookId", async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const {
            libraryName, floorNumber, rakeNumber
        } = req.body;

        const updateBook = await Library.findOneAndUpdate({ id: bookId }, {
            library: {
                libraryName, floorNumber, rakeNumber
            }
        });
        // console.log(updateBook);

        await updateBook?.save()

        if (updateBook) {
            return successHandler(res, 200, updateBook);
        }
    } catch (error) {
        return errorHandler(res, 500, "Server error!")
    }
});

export { router as updateLibrary }