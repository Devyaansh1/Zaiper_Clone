import { NextFunction, Request, Response } from "express";
import { SignInSchema, SignUpSchema } from "../types";
import { prismaClient } from "../config/db";
import jwt from "jsonwebtoken";
import { JWT_PASS } from "../config/config";

export const SignUp = async (
  req: Request,
  res: Response,
  Next: NextFunction
) => {
  const body = req.body;
  const parsedData = SignUpSchema.safeParse(body);

  if (!parsedData.success) {
    return Next(
      res.status(411).json({
        success: false,
        message: "Incorrect inputs",
      })
    );
  }

  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (userExists) {
    res.status(403).json({
      success: false,
      message: "User already exists",
    });
  }

  await prismaClient.user.create({
    data: {
      email: parsedData.data.username,
      password: parsedData.data.password,
      name: parsedData.data.name,
    },
  });

  res.status(201).json({
    success: true,
    message: "User created successfully",
  });
};

export const signIn = async (
  req: Request,
  res: Response,
  Next: NextFunction
) => {
  const body = req.body;
  const parsedData = SignInSchema.safeParse(body);
  if (!parsedData.success) {
    return Next(
      res.status(411).json({
        success: false,
        message: "Incorrect inputs",
      })
    );
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    res.status(403).json({
      success: false,
      message: "Sorry credentials are incorrect",
    });
  }

  const token = jwt.sign(
    {
      id: user?.id,
    },
    JWT_PASS
  );

  res.status(200).json({
    token: token,
  });
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const id = req.id;

  const user = await prismaClient.user.findFirst({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  res.status(200).json({
    success: true,
    user,
  });
};
