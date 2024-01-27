import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
});

const Discount = mongoose.model("Discount", discountSchema);

export default Discount;
