import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import productsRoutes from "./routes/productRoutes"
import { setupSwagger } from "./swagger";
import bodyParser from "body-parser";

export const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
setupSwagger(app);
