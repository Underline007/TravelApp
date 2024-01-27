import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Destinations", destinationSchema);
