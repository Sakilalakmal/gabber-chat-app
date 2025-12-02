import { createStreamUser } from "../lib/stream.js";
import User from "../models/User.js";

export const userOnboarding = {
  userOnBoarding: async (req, res) => {
    try {
      const userId = req.user._id;

      const { fullName, bio, nativeLanguage, location } = req.body;

      if (!fullName || !bio || !nativeLanguage || !location) {
        return res.status(400).json({
          message: "fill all fields to get best user experience",
          missingFields: [
            !fullName && "fullName",
            !bio && "bio",
            !nativeLanguage && "nativeLanguage",
            !location && "location",
          ].filter(Boolean),
        });
      }

      const onBoardUser = await User.findByIdAndUpdate(
        userId,
        {
          ...req.body,
          isOnboarded: true,
        },
        { new: true }
      );

      if (!onBoardUser) {
        return res
          .status(404)
          .json({ message: "User not found - cant update this user" });
      }

      try {
        await createStreamUser({
          id: onBoardUser._id.toString(),
          name: onBoardUser.fullName,
          image: onBoardUser.profilePic || "",
        });
      } catch (streamError) {
        console.log(
          "error in create stream user during onboarding",
          streamError.message
        );
      }

      return res.status(200).json({
        success: true,
        message: "User onboarded successfully",
        user: onBoardUser,
      });
    } catch (error) {
      console.error("Error during user onboarding:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
