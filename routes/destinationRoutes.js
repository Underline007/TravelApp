import express from "express";
import {
    createDestinationController,
    updateDestinationController,
    getDestinationController,
    getSingleDestinationController,
    DestinationPhotoController,
    deleteDestinationController,
    searchDestinationController,
    relatedDestinationController,
    destinationCategoryController,
    getDestinationName,
} from "../controllers/destinationController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidableMiddleware from "express-formidable";

const router = express.Router();

router.post("/create-destination", requireSignIn, isAdmin, formidableMiddleware(), createDestinationController);
router.put("/update-destination/:id", requireSignIn, isAdmin, formidableMiddleware(), updateDestinationController);
router.delete("/delete-destination/:id", deleteDestinationController);

router.get("/get-destination", getDestinationController);
router.get("/get-destination/:slug", getSingleDestinationController);
router.get("/destination-photo/:pid", DestinationPhotoController);

router.get("/search/:keyword", searchDestinationController);
router.get("/related-destination/:pid/:cid", relatedDestinationController);
router.get("/destination-category/:slug", destinationCategoryController);
router.get("/destination-name/:id", getDestinationName);




export default router;
