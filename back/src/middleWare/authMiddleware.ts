import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AuthorizedRequest extends Request {
  body: {
    userId: number;
  };
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") next();
  if (!req.headers?.authorization) return res.status(401).json({ message: "Пользователь не авторизован" });

  try {
    const userId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY || "") as string;
    const authorizedRequest = req as AuthorizedRequest;
    authorizedRequest.body.userId = +userId;
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(401).json({ message: "" });
    }
  }
};

export default authMiddleware;
