import User from "../models/User.js";

export const userControllers = {
  getRecommendedUsers: async (req, res) => {
    try {
      const currentUserId = req.user.id;

      const currentUser = req.user;

      const recommendedUsers = await User.find({
        $and: [
          { _id: { $ne: currentUserId } },
          { _id: { $nin: currentUser.friends } },
          { isOnboarded: true },
        ],
      }).select("-password");

      res.status(200).json({ users: recommendedUsers });
    } catch (error) {
      console.error("Error fetching recommended users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getFreinds: async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
        .select(" freinds")
        .populate(" freinds", "fullName bio  profilePic   nativeLanguage");

      res.status(200).json({ friends: user.freinds });
    } catch (error) {
      console.error("Error fetching friends:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
