import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Product } from "./entities/Product";
import path from "path";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.join(__dirname, "database.sqlite"),
  synchronize: true, // dev only; para produção use migrations
  logging: false,
  entities: [User, Product],
});
