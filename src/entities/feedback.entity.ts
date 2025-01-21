import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "feedback" })
export class FeedbackEntity extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1000 })
  text: string;

  @Column("float")
  score: number;

  @Column("float")
  magnitude: number;

  @Column({ length: 10 })
  sentiment: string;

  @ManyToOne(() => UserEntity, (user) => user.feedbacks, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
