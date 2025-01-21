import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";
import { SentimentType } from "@/types";

@Entity({ name: "feedback" })
export class FeedbackEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ length: 1000 })
  text: string;

  @Column("float")
  score: number;

  @Column("float")
  magnitude: number;

  @Column({ type: "enum", enum: ["Good", "Bad", "Neutral"] })
  sentiment: SentimentType;

  @ManyToOne(() => UserEntity, (user) => user.feedbacks, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
