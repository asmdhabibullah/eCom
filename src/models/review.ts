import {
    model, Schema, Model, Document
} from "mongoose";

interface ReviewInterface {
    reviewar?: string,
    product?: string,
    reviewText?: string
}

interface ReviewDoc extends Document {
    reviewar?: string,
    product?: string,
    reviewText?: string
}

interface UseReviewInterface extends Model<ReviewDoc> {
    build(arrts: ReviewInterface): ReviewDoc;
};

// Review app MongoDB schema for database fields
const ReviewSchema = new Schema(
    {
        reviewar: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Shop.shopProducts"
        },
        reviewText: {
            type: String,
            trim: true
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
ReviewSchema.statics.build = (attrs: ReviewInterface) => {
    return new Review(attrs);
}

const Review = model<ReviewDoc, UseReviewInterface>("Review", ReviewSchema);

export { Review }