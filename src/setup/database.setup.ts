/** @format */

import { createDatabase } from "typeorm-extension";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { UserEntity } from "@/entities";
import { AppDataSource } from "./datasource";
import bcrypt from "bcryptjs";
import { authService } from "@/services";
import { CreateUserRequestType } from "@/types";
import "dotenv/config";

export const databaseSetup = async (): Promise<void> => {
  await createDatabase({
    ifNotExist: true,
    options: {
      type: "postgres",
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_DATABASE,
      synchronize: true,
      entities: [UserEntity],
      entitySkipConstructor: true,
      namingStrategy: new SnakeNamingStrategy(),
    },
  });

  await AppDataSource.initialize();

  // Adding admin user when the database setup
  const userRepository = AppDataSource.getRepository(UserEntity);

  const userCount: number = await userRepository.count();

  if (userCount === 0) {
    const adminHashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );
    const userHashedPassword = await bcrypt.hash(process.env.USER_PASSWORD, 10);

    const adminUser: CreateUserRequestType = {
      name: process.env.ADMIN_NAME,
      hashedPassword: adminHashedPassword,
      role: "admin",
    };

    const user1: CreateUserRequestType = {
      name: "user1",
      hashedPassword: userHashedPassword,
      role: "user",
    };

    const user2: CreateUserRequestType = {
      name: "user2",
      hashedPassword: userHashedPassword,
      role: "user",
    };

    await Promise.all([
      authService.createUser(adminUser),
      authService.createUser(user1),
      authService.createUser(user2),
    ]);
  }
};
