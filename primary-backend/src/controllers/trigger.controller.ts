import { Request, Response } from "express";
import { prismaClient } from "../config/db";

export const getAvailableTriggers = (req: Request, res: Response) => {
  const availableTriggers = prismaClient.availableTrigger.findMany({});
  res.status(200).json({
    availableTriggers,
  });
};
