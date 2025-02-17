import { Request, Response } from "express";
import { createUser, getUser } from "../services/userService";
import { User, UserSessionData } from "../models/user";
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

interface UserResponse extends Response {
  message: string;
  user?: UserSessionData;
}

const createUserResponseHandler = (message: string, user?: UserSessionData): UserResponse => {
  return {
    message,
    user,
  } as UserResponse;
};

export const registerUser = async (req: UserRegisterRequest, res: Response) => {
  const user = req.body;

  if (!user.email || !user.nickname || !user.password) {
    return res.status(400).json(createUserResponseHandler("No user data"));
  }

  const dbUser = await getUser(user.email);

  if (dbUser) {
    return res.status(400).json(createUserResponseHandler("User already exists"));
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const success = await createUser({ email: user.email, nickname: user.nickname, password: hashedPassword } as User);

  if (success.status === 201) {
    return res.status(200).json(
      createUserResponseHandler("Successfully registered", {
        id: success.data.id,
        email: success.data.email,
        nickname: success.data.nickname,
      }),
    );
  }

  return res.status(503).json("Service unavailable");
};

export const loginUser = async (req: UserLoginRequest, res: Response) => {
  const user = req.body;

  if (!user.email || !user.password) {
    return res.status(400).json(createUserResponseHandler("No user data"));
  }

  const dbUser = await getUser(user.email);

  if (!dbUser) {
    return res.status(400).json(createUserResponseHandler("User not found"));
  }

  const passwordMatch = await bcrypt.compare(user.password, dbUser.password);

  if (!passwordMatch) {
    return res.status(400).json(createUserResponseHandler("Invalid credentials"));
  }

  return res.status(200).json(
    createUserResponseHandler("Successfully authorized", {
      id: dbUser.id,
      email: dbUser.email,
      nickname: dbUser.nickname,
    }),
  );
};
