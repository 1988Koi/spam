import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.JWT_SECRET || "spamton_secret";

export interface AuthRequest extends Request {
  userId?: number;
}

export function authenticateJWT(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "missing token" });
  }

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, SECRET) as { id: number };
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "invalid token" });
  }
}
