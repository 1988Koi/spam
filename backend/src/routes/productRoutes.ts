import { Router } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import { getAll, create, update, remove } from "../controllers/productController";

const router = Router();

// GET all products → PUBLIC
router.get("/", getAll);

// CREATE, UPDATE, DELETE → require JWT
router.post("/", authenticateJWT, create);
router.put("/:id", authenticateJWT, update);
router.delete("/:id", authenticateJWT, remove);

export default router;
