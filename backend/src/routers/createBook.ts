import express, { Request, Response } from "express";
import { successHandler, errorHandler } from "package.breezebd.com";
import { Library } from "../models/library";

const router = express.Router();

router.post("/api/create/book", async (req: Request, res: Response) => {
    // console.log("HI, I'm active user.");
    try {
        const { bookName, bookWriter, bookPrice, bookPublisher, bookPublished
        } = req.body;
        const libraty = Library.build({
            bookName, bookWriter, bookPrice, bookPublisher, bookPublished
        });

        await libraty.save();
        return successHandler(res, 200, libraty);
    } catch (error) {
        return errorHandler(res, 500, "Server error!")
    }
});

export { router as createBook }