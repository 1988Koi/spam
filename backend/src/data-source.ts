import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import { User } from "./entities/User";
import { Product } from "./entities/Product";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: path.join(__dirname, "../../backend/database.sqlite"),
  synchronize: true,
  logging: false,
  entities: [User, Product],
  migrations: [],
  subscribers: [],
});
