/** @format */

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";
import { FeedbackEntity } from "./feedback.entity";

@Entity({ name: "user" })
export class UserEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "hashed_password" })
  hashedPassword: string;

  @Column({ type: "enum", enum: ["user", "admin"], default: "user" })
  role: string;

  @OneToMany(() => FeedbackEntity, (sentiment) => sentiment.user)
  feedbacks: FeedbackEntity[];
}
