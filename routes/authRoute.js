import express from "express";
import {
    registerController,
    loginController,
    forgotPasswordController,
    updateProfileController,
    getUsersByRoleController,
    getTourGuideName,
    getAllUsers,
    deleteUser,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);


//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", updateProfileController);

//get tour guide
router.get('/users/role2', getUsersByRoleController);

//get name user
router.get('/tourguide-name/:id', getTourGuideName);

//get all user
router.get('/users', getAllUsers);

// delete user
router.delete('/users/:id', deleteUser);


export default router;