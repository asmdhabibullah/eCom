import {
    model, Schema, Model, Document, Date
} from "mongoose";

// Library attributes
interface ShopAttrs {
    shopName?: string,
    shopOwner?: string,
    shopProducts?: [
        {
            productName?: string,
            totalSupply?: number,
            productPrice?: string,
            productNumber?: number,
            productPublished?: Date,
            publisher?: string
        }
    ],
};

// Library model properties that has in Model
interface ShopModel extends Model<ShopDoc> {
    build(attrs: ShopAttrs): ShopDoc;
};

// Interface that has founder properties in the Documents object.
interface ShopDoc extends Document {
    shopName?: string,
    shopProducts?: [
        {
            productName?: string,
            totalSupply?: number,
            productPrice?: string,
            productNumber?: number,
            productPublished?: Date,
            publisher?: string
        }
    ],
    shopOwner?: string
};

// Library app MongoDB schema for database fields
const ShopSchema = new Schema(
    {
        shopName: {
            type: String,
            trim: true,
            default: null
        },
        shopProducts: [
            {
                productName: String,
                totalSupply: Number,
                productPrice: String,
                productNumber: Number,
                productPublished: Date,
                publisher: String,
                reviews: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: "Review"
                    }
                ]
            }
        ],
        soldProducts: [
            {
                productName: String,
                productPrice: String,
                productNumber: Number,
                productOrderDate: Date,
                productDeliveryDate: Date
            }
        ],
        totalSell: {
            type: Number
        },
        earnTotalAmount: {
            type: Number
        },
        shopOwner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);


// Use this schema's interface here
// const buildUser = (attrs: LibrarySchema) => {
//     return new Library(attrs);
// }

// Better way to approch
ShopSchema.statics.build = (attrs: ShopAttrs) => {
    return new Shop(attrs);
}

const Shop = model<ShopDoc, ShopModel>("Shop", ShopSchema);


export { Shop }

// const user = Library.build({
//     usename: "asmdhabibullah",
//     firstname: "As",
//     lastname: "Md Habibullah",
//     email: "asmdhabibullah96@gmail.com",
//     password: "Pass123456@#$"
// });

// Library
// First name
// Last name
// Phone number
// Mail address
// Password
// NID number[Any country] / Same as
// Account number
// Permanent Address
// Present address
// Picture
// Signeture
// Deposit amount
// Profit
// Re invest
// Withdraw amount
// Librarys[]
// Nominee
    // First name
    // Last name
    // Phone number
    // Mail address
    // NID number[Any country]/ Same as others
    // Permanent Address
    // Present address
    // Picture
    // Signeture