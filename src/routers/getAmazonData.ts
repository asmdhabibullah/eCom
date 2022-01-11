import axios from 'axios';
import express, { Request, Response } from "express";
import { successHandler, errorHandler } from "package.breezebd.com";

const router = express.Router();

router.get("/api/amazone/data", async (req: Request, res: Response) => {
    try {
        console.log("HI, I'm active user.");
        // const { key } = req.body;
        const result = await axios.get("https://fakestoreapi.com/products");

        // const json = result.data.json();
        // console.log("Amazon data", data);

        if (result.status === 200) {
            return successHandler(res, 200, result.data);
        }
        return errorHandler(res, 404, "Products not found!")

    } catch (error) {
        return errorHandler(res, 500, "Server error!")
    }
});

export { router as getAmazoneData }