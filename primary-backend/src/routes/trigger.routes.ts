import express from "express";

const triggerRouter = express.Router();

triggerRouter.get("/available");

export default triggerRouter;
