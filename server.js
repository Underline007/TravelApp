import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import emailRoutes from "./routes/emailRoutes.js"
import discountRoutes from "./routes/discountRoutes.js"

import cors from "cors";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/destination", destinationRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/email", emailRoutes);
app.use("/api/v1/discount", discountRoutes);



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
            .white
    );
});