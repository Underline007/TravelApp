import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        destination:
        {
            type: mongoose.ObjectId,
            ref: "Destinations",
        },
        buyer: {
            type: mongoose.ObjectId,
            ref: "users",
        },
        tourGuide: {
            type: mongoose.ObjectId,
            ref: "users",
        },
        startDate: {
            type: String,
            required: true,
        },
        appointmentMeeting: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: Number,
            default: 1,
        },

    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);