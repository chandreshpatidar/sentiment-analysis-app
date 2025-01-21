import { Request } from "express";
import { UserEntity } from "@/entities";

export interface AuthenticatedRequest extends Request {
  user?: UserEntity | null;
}
