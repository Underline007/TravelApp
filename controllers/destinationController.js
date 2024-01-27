import destinationModel from "../models/destinationModel.js"
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import fs from "fs";
import slugify from "slugify";
import dotenv from "dotenv";

dotenv.config();


export const createDestinationController = async (req, res) => {
    try {
        const { name, description, price, category, duration } = req.fields;
        const { photo } = req.files;

        // Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !duration:
                return res.status(500).send({ error: "Duration is Required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({
                    error: "Photo is Required and should be less than 1mb",
                });
        }

        const destinations = new destinationModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            destinations.photo.data = fs.readFileSync(photo.path);
            destinations.photo.contentType = photo.type;
        }
        await destinations.save();
        res.status(201).send({
            success: true,
            message: "destination Created Successfully",
            destinations,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating destination",
        });
    }
};

export const getDestinationController = async (req, res) => {
    try {
        const destinations = await destinationModel
            .find({})
            .populate("category")
            .select("-photo")
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            countTotal: destinations.length,
            message: "All destinations",
            destinations,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting destinations",
            error: error.message,
        });
    }
};

export const getSingleDestinationController = async (req, res) => {
    try {
        const destination = await destinationModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single destination Fetched",
            destination,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting single destination",
            error,
        });
    }
};

export const DestinationPhotoController = async (req, res) => {
    try {
        const destination = await destinationModel
            .findById(req.params.pid)
            .select("photo");
        if (destination.photo.data) {
            res.set("Content-type", destination.photo.contentType);
            return res.status(200).send(destination.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error,
        });
    }
};

export const deleteDestinationController = async (req, res) => {
    try {
        const { id } = req.params;
        await destinationModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Destination deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting destination",
            error,
        });
    }
};

export const updateDestinationController = async (req, res) => {
    try {
        const { name, description, price, category, duration } = req.fields;
        const { photo } = req.files;

        // Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !duration:
                return res.status(500).send({ error: "Duration is Required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({
                    error: "Photo is Required and should be less than 1mb",
                });
        }

        const destinations = await destinationModel.findByIdAndUpdate(
            req.params.id,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            destinations.photo.data = fs.readFileSync(photo.path);
            destinations.photo.contentType = photo.type;
        }
        await destinations.save();
        res.status(201).send({
            success: true,
            message: "destination Updated Successfully",
            destinations,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Update destination",
        });
    }
};




export const searchDestinationController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await destinationModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Search destination API",
            error,
        });
    }
};

export const relatedDestinationController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const destinations = await destinationModel
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select("-photo")
            .limit(3)
            .populate("category");
        res.status(200).send({
            success: true,
            destinations,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting related destination",
            error,
        });
    }
};

export const destinationCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const destinations = await destinationModel.find({ category }).populate("category");
        res.status(200).send({
            success: true,
            category,
            destinations,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Error While Getting destinations",
        });
    }
};

export const getDestinationName = async (req, res) => {
    try {
        const destinationId = req.params.id;
        const destination = await destinationModel.findById(destinationId);

        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }

        res.json({ name: destination.name });
    } catch (error) {
        console.error('Error fetching destination:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
