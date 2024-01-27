import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
};

// // USER AUTH
export const isAuth = async (req, res, next) => {
    const { token } = req.token;
    //valdiation
    if (!token) {
        return res.status(401).send({
            success: false,
            message: "UnAuthorized User",
        });
    }
    const decodeData = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await userMdoel.findById(decodeData._id);
    next();
};

//admin acceess
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
};