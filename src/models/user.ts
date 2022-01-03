import {
    model, Schema, Model, Document
} from "mongoose";
import { Password } from "../service/password";

// user role
enum Role {
    Shop = "Shop",
    Customer = "Customer",
}

interface UserInterface {
    name?: string;
    userName?: string;
    email?: string;
    password?: string;
    data?: object;
    status?: boolean;
    products?: [object];
    role?: string;
}

interface UserDoc extends Document {
    name?: string;
    userName?: string;
    email?: string;
    password?: string;
    data?: object;
    status?: boolean;
    products?: [object];
    orders?: [any]
}

interface UseUserInterface extends Model<UserDoc> {
    build(arrts: UserInterface): UserDoc;
};

// User app MongoDB schema for database fields
const UserSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        userName: {
            type: String,
            trim: true,
            required: false,
        },
        email: {
            type: String,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
        accessToken: {
            type: String,
            trim: true
        },
        status: {
            type: Boolean,
            default: false
        },
        orders: [
            {
                type: Schema.Types.ObjectId,
                ref: "Order"
            }
        ],
        role: {
            type: String,
            trim: true,
            required: true,
            enum: Role,
            default: "Customer"
        }
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

UserSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

// Better way to approch
UserSchema.statics.build = (attrs: UserInterface) => {
    return new User(attrs);
}

const User = model<UserDoc, UseUserInterface>("User", UserSchema);

export { User }



// Use this schema's interface here
// const buildUser = (attrs: UserSchema) => {
//     return new User(attrs);
// }

// const user = User.build({
//     usename: "asmdhabibullah",
//     name: "As",
//     lastname: "Md Habibullah",
//     email: "asmdhabibullah96@gmail.com",
//     password: "Pass123456@#$"
// });

// Founder
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
// Investors[]
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