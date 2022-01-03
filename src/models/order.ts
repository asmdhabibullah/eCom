import {
    model, Schema, Model, Document
} from "mongoose";

interface OrderInterface {
    orderId?: string;
    products?: {
        productId?: string;
        productTitle?: string;
        productPrice?: string;
        productDescription?: string;
        productCategory?: string;
        productImage?: string;
        productRating?: number;
    };
    totalAmount?: string;
    user?: any;
}

interface OrderDoc extends Document {
    orderId?: string;
    products?: {
        productId?: string;
        productTitle?: string;
        productPrice?: string;
        productDescription?: string;
        productCategory?: string;
        productImage?: string;
        productRating?: number;
    };
    totalAmount?: string;
    user?: any;
}

interface UseOrderInterface extends Model<OrderDoc> {
    build(arrts: OrderInterface): OrderDoc;
};

// Order app MongoDB schema for database fields
const OrderSchema = new Schema(
    {
        orderId: {
            type: String,
            trim: true
        },
        totalAmount: {
            type: String,
            trim: true
        },
        products: [
            {
                productId: {
                    type: String,
                    trim: true
                },
                productTitle: {
                    type: String,
                    trim: true
                },
                productPrice: {
                    type: String,
                    trim: true
                },
                productDescription: {
                    type: String,
                    trim: true
                },
                productCategory: {
                    type: String,
                    trim: true
                },
                productImage: {
                    type: String,
                    trim: true
                },
                productRating: {
                    type: Number
                },
            }
        ],
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            }
        }
    }
);


// Better way to approch
OrderSchema.statics.build = (attrs: OrderInterface) => {
    return new Order(attrs);
}

const Order = model<OrderDoc, UseOrderInterface>("Order", OrderSchema);

export { Order }