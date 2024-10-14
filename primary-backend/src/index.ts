import express, { Request, Response } from "express";
import Cors from "cors";
import userRouter from "./routes/user.routes";
import zapRouter from "./routes/zap.routes";
import triggerRouter from "./routes/trigger.routes";
import actionRouter from "./routes/action.routes";

const app = express();

app.use(express.json());
app.use(Cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);
app.use("/api/v1/trigger", triggerRouter);
app.use("/api/v1/trigger", actionRouter);

app.listen(8001, () => {
  console.log(`App Listening on PORT: ${8001}`);
});
