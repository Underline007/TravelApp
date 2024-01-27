import orderModel from "../models/orderModel.js";
import mongoose from 'mongoose';


export const createOrderController = async (req, res) => {
    console.log(req)
    try {
        const { buyer, destination, startDate, appointmentMeeting, amount, tourGuide } = req.body;

        const order = await orderModel.create({
            buyer,
            tourGuide,
            destination,
            startDate,
            appointmentMeeting,
            amount,
            status: 1,
        });

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error,
        });
    }
};



export const checkInOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: 'Invalid order ID' });
        }

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.status < 3) {
            order.status += 1;
            await order.save();
            return res.status(200).json({ message: 'Order status updated successfully', order });
        } else {
            return res.status(200).json({ message: 'Order is completed, can not check in' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



export const getMyOrdersController = async (req, res) => {
    try {

        const { buyerId } = req.params;

        // find orders
        const orders = await orderModel.find({ buyer: buyerId });

        //valdiation
        if (!orders) {
            return res.status(404).send({
                success: false,
                message: "no orders found",
            });
        }
        res.status(200).send({
            success: true,
            message: "your orders data",
            orders,

        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In My orders Order API",
            error,
        });
    }
};

// Get Single Order Details Controller
export const getSingleOrderDetailsController = async (req, res) => {
    try {


        const order = await orderModel.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Order details retrieved successfully',
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving order details',
            error,
        });
    }
};


// get all orders (admin)
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting orders",
            error,
        });
    }
};

// update order status (admin)
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });

        res.json(updatedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating order status",
            error,
        });
    }
};