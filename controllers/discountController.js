// controllers/discountController.js
import Discount from "../models/discountModel.js";


export const createDiscountController = async (req, res) => {
    try {
        const { name, expirationDate, value } = req.body;

        if (!name || !expirationDate || !value) {
            return res.status(400).send({ message: "Name, expirationDate, and value are required" });
        }
        const existingDiscount = await Discount.findOne({ name });
        if (existingDiscount) {
            return res.status(200).send({
                success: true,
                message: "Discount already exists",
            });
        }
        const discount = await new Discount({
            name,
            expirationDate,
            value,
        }).save();

        res.status(201).send({
            success: true,
            message: "New discount created",
            discount,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Discount",
        });
    }
};



export const updateDiscountController = async (req, res) => {
    try {
        const { name, expirationDate, value } = req.body;
        const { id } = req.params;


        if (!name || !expirationDate || !value) {
            return res.status(400).send({ message: "Name, expirationDate, and value are required" });
        }

        const updatedDiscount = await Discount.findByIdAndUpdate(
            id,
            { name, expirationDate, value },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: "Discount updated successfully",
            discount: updatedDiscount,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating discount",
        });
    }
};


export const getAllDiscountsController = async (req, res) => {
    try {
        const discounts = await Discount.find({});
        res.status(200).send({
            success: true,
            message: "All Discounts List",
            discounts,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all discounts",
        });
    }
};


export const deleteDiscountController = async (req, res) => {
    try {
        const { id } = req.params;

        await Discount.findByIdAndDelete(id);

        res.status(200).send({
            success: true,
            message: "Discount deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting discount",
            error,
        });
    }
};


export const checkDiscount = async (req, res) => {
    const { name } = req.body;
    try {
        const discount = await Discount.findOne({ name });
        res.status(200).send({
            success: true,
            message: "Get Discount Successfully",
            discount,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While getting Discount",
        });
    }
};