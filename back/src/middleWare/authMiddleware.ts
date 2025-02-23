import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserSessionData } from "../models/user";

interface AuthorizedRequest extends Request {
  body: {
    userId: number;
  };
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") next();
  if (!req.headers?.authorization) return res.status(401).json({ message: "User unauthorized" });

  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY || "") as UserSessionData;
    const authorizedRequest = req as AuthorizedRequest;
    authorizedRequest.body.userId = user.id;
    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "unexpected server error" });
    }
  }
};

export default authMiddleware;
