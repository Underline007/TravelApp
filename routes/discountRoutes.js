import express from "express";
import {
    createDiscountController,
    updateDiscountController,
    getAllDiscountsController,
    deleteDiscountController,
    checkDiscount
}

    from "../controllers/discountController.js";

const router = express.Router();


router.post("/discounts", createDiscountController);

router.put("/discounts/:id", updateDiscountController);

router.get("/discounts", getAllDiscountsController);

router.delete("/discounts/:id", deleteDiscountController);

router.post("/check-discount", checkDiscount);


export default router;

