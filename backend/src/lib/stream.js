import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
dotenv.config();

const SApi_key = process.env.STREAM_API_KEY;
const SApi_secret = process.env.STREAM_SECRET_KEY;

if (!SApi_key || !SApi_secret) {
  throw new Error(
    "Stream API key and secret must be defined in environment variables"
  );
}

const streamClient = StreamChat.getInstance(SApi_key, SApi_secret);

export const createStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    return userData;
  } catch (error) {
    console.error("Error creating Stream user:", error);
    throw error;
  }
};

export const generateStreamToken = (userId) => {
  // TODO implement this function to generate stream token for a user
};
