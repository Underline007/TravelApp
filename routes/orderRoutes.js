import express from "express";
import { isAdmin, isAuth, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
    checkInOrder,
    createOrderController,
    getMyOrdersController,
    getSingleOrderDetailsController,
    getAllOrdersController,
    orderStatusController

} from "../controllers/orderController.js";

const router = express.Router();


// ============== ORDERS ROUTES ==================

// CREATE ORDERS
router.post("/create", createOrderController);

//  GET ALL ORDERS
router.get("/my-orders/:buyerId", getMyOrdersController);

//  GET SINGLE ORDER DETAILS
router.get("/single-orders/:id", getSingleOrderDetailsController);

//check in
router.put('/:orderId/check-in', checkInOrder);


//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
);


export default router;