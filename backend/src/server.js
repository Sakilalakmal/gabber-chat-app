import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth-routes.js";
import connectDB from "./lib/db.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

//routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "server is running ✅" });
});

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
