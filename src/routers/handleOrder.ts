import { rdsClint } from './middleware/index';
import express, { Request, Response } from "express";
import { successHandler, errorHandler } from "package.breezebd.com";
import { Order } from '../models/order';
import { User } from '../models/user';

const router = express.Router();

router.post("/api/confirm/order", async (req: Request, res: Response) => {
    try {
        // const { bookId, key } = req.params;
        // console.log(req.body);

        const { items, total, email } = req.body;

        // console.log("req.params", req.params);

        // await Order.findOne({ id: bookId }).exec((err, doc) => {
        //     // console.log(err, docs);
        //     // const activeUsers = docs.filter(doc => doc.status === true);
        //     if (!err && doc) {
        //         rdsClint.setex(`${key}_${bookId}`, 3600, doc as any);
        //         return successHandler(res, 200, doc);
        //     }
        //     return errorHandler(res, 404, "Book not found!")
        // });

        const user = await User.findOne({ email });

        if (user && items) {
            const orderId = Math.random().toString(36).substring(2, 9);

            const order = await Order.build({ orderId, totalAmount: total, user });
            // order.products = items;
            user.orders?.push(order);

            await user.save()
            await order.save();

            const newOrder = await Order.findOne({ orderId });

            // console.log("newOrder", newOrder);

            if (newOrder) {
                let newItems: any = [];
                items.map(async (product: any) => {
                    const { id, title, price, description, category, image } = product
                    const data = {
                        productId: id,
                        productTitle: title,
                        productPrice: price,
                        productDescription: description,
                        productCategory: category,
                        productImage: image
                    };
                    newItems.push(data);
                });

                newOrder.products = newItems;
                await newOrder.save();
            }


            // items.map(async (product: any) => {
            //     const { id, title, price, description, category, image } = product
            //     const order = await Order.build({
            //         order: {
            //             
            //         }
            //     });
            //     await order.save();
            // });

            // const getOrder = await Order.findOne({ order: { productId: id } });

            return successHandler(res, 201, { order, msg: "Order accepted!" });

        } else {
            return errorHandler(res, 404, "Please select minmum one product to cart");
        }

        // return successHandler(res, 200, "Order accepted!");

    } catch (error) {
        return errorHandler(res, 500, "Server error")
    }
});

export { router as confirmOrder }