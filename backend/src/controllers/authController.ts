import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const SECRET = process.env.JWT_SECRET || "spamton_secret";

export const register = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(User);
  const { username, password } = req.body;

  const existing = await repo.findOneBy({ username });
  if (existing) return res.status(400).json({ message: "Username already exists" });

  const hash = await bcrypt.hash(password, 10);
  const user = repo.create({ username, password: hash });
  await repo.save(user);
  res.json({ message: "User registered" });
};

export const login = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(User);
  const { username, password } = req.body;

  const user = await repo.findOneBy({ username });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, SECRET);
  res.json({ token });
};
