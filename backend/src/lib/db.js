import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/gabber-chat-app")
      .then(() => {
        console.log("MongoDB connected successfully ✅");
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
      });
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
