import {
    model, Schema, Model, Document, Date
} from "mongoose";

// Library attributes
interface LibraryAttrs {
    bookName?: string,
    bookWriter?: string,
    bookPrice?: string,
    bookPublisher?: string,
    bookPublished?: Date,
    library?: {
        libraryName?: string,
        floorNumber?: number,
        rakeNumber?: string
        taken?: boolean,
        takenDate?: Date,
        returnDate?: Date,
        user?: string
    }
};

// Library model properties that has in Model
interface LibraryModel extends Model<LibraryDoc> {
    build(attrs: LibraryAttrs): LibraryDoc;
};

// Interface that has founder properties in the Documents object.
interface LibraryDoc extends Document {
    bookName?: string,
    bookWriter?: string,
    bookPrice?: string,
    bookPublisher?: string,
    bookPublished?: Date,
    library?: {
        libraryName?: string,
        floorNumber?: number,
        rakeNumber?: string
        taken?: boolean,
        takenDate?: Date,
        returnDate?: Date,
        user?: string
    }
};

// Library app MongoDB schema for database fields
const LibrarySchema = new Schema(
    {
        bookName: {
            type: String,
            trim: true,
            default: null
        },
        bookWriter: {
            type: String,
            trim: true,
            default: null
        },
        bookPrice: {
            type: String,
            trim: true,
            default: null
        },
        bookPublisher: {
            type: String,
            trim: true,
            default: null
        },
        bookPublished: {
            type: String,
        },
        library: {
            libraryName: {
                type: String,
                trim: true
            },
            floorNumber: {
                type: String,
                trim: true
            },
            rakeNumber: {
                type: String,
                trim: true
            },
            taken: {
                type: Boolean,
                default: false
            },
            takenDate: {
                type: Date
            },
            returnDate: {
                type: Date
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
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
LibrarySchema.statics.build = (attrs: LibraryAttrs) => {
    return new Library(attrs);
}

const Library = model<LibraryDoc, LibraryModel>("Library", LibrarySchema);


export { Library }

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