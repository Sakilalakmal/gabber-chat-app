import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import chatController from "../controllers/chat-controller.js";

const chatRouter = express.Router();

chatRouter.get("/token", isAuthenticated, chatController.generateStreamToken);

export default chatRouter;
