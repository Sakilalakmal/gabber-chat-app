import express from "express";
import { userControllers } from "../controllers/user-controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const userRouter = express.Router();

userRouter.use(isAuthenticated);

userRouter.get("/", userControllers.getRecommendedUsers);

userRouter.get("/friends", userControllers.getFreinds);

userRouter.post("/friend-request/:id", userControllers.sendFreindRequest);

userRouter.post(
  "/friend-request/:id/accept",
  userControllers.acceptFreindRequest
);

userRouter.get("/friend-requests", userControllers.getFreindrequests);

userRouter.get("/already-sent-requests", userControllers.alreadySentRequest);

// Update language preferences for translation
userRouter.patch(
  "/language-preferences",
  userControllers.updateLanguagePreferences
);

export default userRouter;
