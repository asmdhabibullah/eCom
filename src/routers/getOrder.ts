import { rdsClint } from './middleware/index';
import express, { Request, Response } from "express";
import { successHandler, errorHandler } from "package.breezebd.com";
import { Order } from '../models/order';

const router = express.Router();

router.get("/api/orders", async (req: Request, res: Response) => {
    try {
        // console.log("HI, I'm active user.");
        const { key } = req.body;
        await Order.find({}).exec((err, docs) => {
            // console.log(docs);
            // const activeUsers = docs.filter(doc => doc.status === true);
            if (!err && docs.length > 0) {
                // rdsClint.setex(key, 86400, docs as any);
                return successHandler(res, 200, docs);
            }
            return errorHandler(res, 404, "Books not found!")
        });
    } catch (error) {

    }
});

export { router as getOrders }