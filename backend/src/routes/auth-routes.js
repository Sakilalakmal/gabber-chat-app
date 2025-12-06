import express from "express";
import { authControllers } from "../controllers/auth-controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const authRouter = express.Router();

authRouter.post("/signup", authControllers.SignUp);

authRouter.post("/login", authControllers.Login);

authRouter.post("/logout", authControllers.LogOut);

//check if user logged in
authRouter.get("/me", isAuthenticated, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default authRouter;
