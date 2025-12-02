import express from "express";
import { authControllers } from "../controllers/auth-controllers.js";

const authRouter = express.Router();

authRouter.post("/signup", authControllers.SignUp);

authRouter.post("/login", authControllers.Login);

authRouter.post("/logout", authControllers.LogOut);

export default authRouter;
