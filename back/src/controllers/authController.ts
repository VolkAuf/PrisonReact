import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUser, getUserById } from "../services/userService";
import { User, UserSessionData } from "../models/user";

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

interface GetCurrentUserRequest extends Request {
  body: {
    userId: number;
  };
}

// TODO: move message to global entity
interface UserResponse extends Response {
  message: string;
  user?: UserSessionData;
  token?: string;
}

const createUserResponseHandler = (message: string, user?: UserSessionData, token?: string): UserResponse => {
  return {
    message,
    user,
    token,
  } as UserResponse;
};

const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY!, { expiresIn: "1d" });
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

  const success = await createUser({
    email: user.email,
    nickname: user.nickname,
    password: hashedPassword,
    avatar: 1,
  } as User);

  if (success.status === 201) {
    return res.status(200).json(
      createUserResponseHandler(
        "Successfully registered",
        {
          id: success.data.id,
          email: success.data.email,
          nickname: success.data.nickname,
          avatar: success.data.avatar,
        },
        createToken(success.data.id),
      ),
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
    createUserResponseHandler(
      "Successfully authorized",
      {
        id: dbUser.id,
        email: dbUser.email,
        nickname: dbUser.nickname,
        avatar: dbUser.avatar,
      },
      createToken(dbUser.id.toString()),
    ),
  );
};

export const getCurrentUser = async (req: GetCurrentUserRequest, res: Response) => {
  const userId = req.body.userId;

  const dbUser = await getUserById(userId);

  if (!dbUser) {
    return res.status(400).json(createUserResponseHandler("User not found"));
  }

  return res.status(200).json(
    createUserResponseHandler("Successfully", {
      id: dbUser.id,
      email: dbUser.email,
      nickname: dbUser.nickname,
      avatar: dbUser.avatar,
    }),
  );
};
