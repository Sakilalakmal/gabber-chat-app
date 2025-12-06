import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth-routes.js";
import connectDB from "./lib/db.js";
dotenv.config();
import cookieParser from "cookie-parser";
import onBoardingRouter from "./routes/user-onboarding-router.js";
import chatRouter from "./routes/chat-route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

//routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "server is running ✅" });
});

app.use("/api/auth", authRouter);
app.use("/api/auth/user", onBoardingRouter);
app.use("/api/chat", chatRouter);

//start server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    //app listen
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
