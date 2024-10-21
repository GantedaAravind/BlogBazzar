import { Router } from "express";
import userRouter from "./userRouter.js";
import blogRouter from "./blogRouter.js";

const appRouter = Router();

appRouter.use("/user", userRouter); //domain/api/v1/user
appRouter.use("/blog", blogRouter); //domain/api/v1/blog


export default appRouter;
