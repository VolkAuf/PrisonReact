import { Request, Response } from "express";
import { createUser, getUser } from "../services/userService";
import { User } from "../models/user";
import bcrypt from "bcrypt";

interface UserLoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

interface UserRegisterRequest extends Request {
  body: {
    nickname: string;
    email: string;
    password: string;
  };
}

export const registerUser = async (req: UserRegisterRequest, res: Response) => {
  const user = req.body;

  if (!user.email || !user.nickname || !user.password) {
    return res.status(400).json("No user data");
  }

  const dbUser = await getUser(user.email);

  if (dbUser) {
    return res.status(400).json("User already exists");
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const success = await createUser({ email: user.email, nickname: user.nickname, password: hashedPassword } as User);
  if (success.status === 200) {
    return res.status(200).json("Successfully registered");
  }

  return res.status(503).json("Service unavailable");
};

export const loginUser = async (req: UserLoginRequest, res: Response) => {
  const user = req.body;

  if (!user.email || !user.password) {
    return res.status(400).json("No user data");
  }

  const dbUser = await getUser(user.email);

  if (!dbUser) {
    return res.status(400).json("Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(user.password, dbUser.password);

  if (!passwordMatch) {
    return res.status(400).json("Invalid credentials");
  }

  return res.status(200).json("Successfully authorized");
};
