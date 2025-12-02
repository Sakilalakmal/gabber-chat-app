import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { userOnboarding } from "../controllers/user-onboarding-controller.js";

const onBoardingRouter = express.Router();

onBoardingRouter.post(
  "/onboarding",
  isAuthenticated,
  userOnboarding.userOnBoarding
);

export default onBoardingRouter;
