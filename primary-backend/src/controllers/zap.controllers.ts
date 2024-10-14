import { Request, Response, NextFunction } from "express";
import { ZapCreateSchema } from "../types";
import { Next } from "@nestjs/common";
import { prismaClient } from "../config/db";

export const zapCreate = async (
  req: Request,
  res: Response,
  Next: NextFunction
) => {
  //@ts-ignore
  const id = req.id;
  const body = req.body;
  const parsedData = ZapCreateSchema.safeParse(body);

  if (!parsedData.success) {
    return Next(
      res.status(400).json({
        message: "Incorrect Input",
      })
    );
  }

  const zapId = await prismaClient.$transaction(async (tx) => {
    const zap = await prismaClient.zap.create({
      data: {
        userId: id,
        triggerId: "",
        actions: {
          create: parsedData.data.actions.map((x, index) => ({
            actionId: x.availableActionId,
            sortingOrder: index,
          })),
        },
      },
    });

    const trigger = await tx.trigger.create({
      data: {
        triggerId: parsedData.data.availableTriggerId,
        zapId: zap.id,
      },
    });

    await prismaClient.zap.update({
      where: {
        id: zap.id,
      },
      data: {
        triggerId: trigger.id,
      },
    });

    return zap.id;
  });

  res.status(200).json({
    zapId,
  });
};

export const getAllZap = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  const id = req.id;
  const zaps = await prismaClient.zap.findMany({
    where: {
      userId: id,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
    },
  });
  res.status(200).json({
    zaps,
  });
};

export const getZapById = async (req: Request, res: Response) => {
  //@ts-ignore
  const id = req.id;
  const zapId = req.params.id;

  const zap = await prismaClient.zap.findFirst({
    where: {
      id: zapId,
      userId: id,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });
};
