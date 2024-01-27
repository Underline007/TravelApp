import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, answer, role } = req.body;

        // validations
        if (!name || !email || !password || !answer) {
            return res.status(400).send({ message: "All fields are required" });
        }

        // check user
        const existingUser = await userModel.findOne({ email });

        // existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already registered. Please login.",
            });
        }

        // register user
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            name,
            email,
            password: hashedPassword,
            answer,
            role: role || 0,
        }).save();

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error,
        });
    }
};

// POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }

        // check user
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            });
        }
        console.log(password, user);
        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }

        // token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};

// forgotPasswordController
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;

        if (!email || !answer || !newPassword) {
            res.status(400).send({ message: "Email, answer, and new password are required" });
        }

        // check
        const user = await userModel.findOne({ email, answer });

        // validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email Or Answer",
            });
        }

        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });

        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};


// update profile
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email });

        const hashedPassword = password ? await hashPassword(password) : undefined;

        const updatedUser = await userModel.findOneAndUpdate(
            { email },
            {
                name: name || user.name,
                password: hashedPassword || user.password,
            },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while updating profile in API",
            error,
        });
    }
};

export const getUsersByRoleController = async (req, res) => {
    try {
        const users = await userModel.find({ role: 2 });
        res.status(200).json({
            success: true,
            message: "Users with role 2 retrieved successfully",
            users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while fetching users by role",
            error,
        });
    }
};


// get name tour guide
export const getTourGuideName = async (req, res) => {
    try {
        const tourGuideId = req.params.id;
        const tourGuide = await userModel.findById(tourGuideId);

        if (!tourGuide) {
            return res.status(404).json({ message: 'Tour Guide not found' });
        }

        res.json({ name: tourGuide.name });
    } catch (error) {
        console.error('Error fetching tour guide:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


//get all user
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).send({
            success: true,
            message: "All User List",
            users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all user in API",
        });
    }
};

//delete user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "User Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting user in API",
            error,
        });
    }
};




