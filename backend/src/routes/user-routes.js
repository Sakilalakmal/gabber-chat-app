import express from "express";
import { userControllers } from "../controllers/user-controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const userRouter = express.Router();

userRouter.use(isAuthenticated);

userRouter.get("/", userControllers.getRecommendedUsers);
 
userRouter.get("/friends", userControllers.getFreinds);

export default userRouter;
