import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";

const repo = () => AppDataSource.getRepository(Product);

export const getAll = async (_: Request, res: Response) => {
  const products = await repo().find();
  res.json(products);
};

export const create = async (req: Request, res: Response) => {
  const product = repo().create(req.body);
  await repo().save(product);
  res.json(product);
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await repo().findOneBy({ id });
  if (!product) return res.status(404).json({ message: "Not found" });

  repo().merge(product, req.body);
  await repo().save(product);
  res.json(product);
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await repo().findOneBy({ id });
  if (!product) return res.status(404).json({ message: "Not found" });

  await repo().remove(product);
  res.json({ message: "Deleted" });
};
