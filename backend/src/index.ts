import "reflect-metadata";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import productRouter from "./routes/productRoutes";

dotenv.config();
const app = express();
app.use(express.json());

// Inicializa DB
AppDataSource.initialize().catch(err => console.error("DB init error:", err));

// Serve frontend estático
const frontendPath = path.join(__dirname, "../../frontend"); // sem 'dist'
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// API
app.use("/api/products", productRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`[BIG SHOT] Server running on port ${PORT}`));
