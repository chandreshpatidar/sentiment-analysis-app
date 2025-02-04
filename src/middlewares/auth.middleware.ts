/** @format */
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { authService } from "@/services";
import { AuthenticatedRequest } from "@/types";

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Authentication required!" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await authService.getUser({ name: decoded.username });

    if (!user) throw "User Not Found!";

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
