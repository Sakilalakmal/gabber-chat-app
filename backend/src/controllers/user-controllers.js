import FriendRequest from "../models/freindRequest.js";
import User from "../models/User.js";

export const userControllers = {
  getRecommendedUsers: async (req, res) => {
    try {
      const currentUserId = req.user.id;

      const currentUser = req.user;

      const recommendedUsers = await User.find({
        $and: [
          { _id: { $ne: currentUserId } },
          { _id: { $nin: currentUser.freinds } },
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
        .select("freinds")
        .populate("freinds", "fullName bio profilePic nativeLanguage");

      res.status(200).json({ friends: user.freinds });
    } catch (error) {
      console.error("Error fetching friends:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  sendFreindRequest: async (req, res) => {
    try {
      const { id: recipientId } = req.params;
      const senderId = req.user.id;

      if (senderId === recipientId) {
        return res
          .status(400)
          .json({ message: "You cannot send a friend request to yourself." });
      }

      const existingRecipient = await User.findById(recipientId);

      if (!existingRecipient) {
        return res.status(404).json({ message: "Recipient user not found." });
      }

      //check alredy friends with that user
      if (existingRecipient.freinds.includes(senderId)) {
        return res
          .status(400)
          .json({ message: "You are already friends with this user." });
      }

      //check already sent request
      const existingRequest = await FriendRequest.findOne({
        $or: [
          { sender: senderId, recipient: recipientId },
          { sender: recipientId, recipient: senderId },
        ],
      });

      if (existingRequest) {
        return res.status(400).json({
          message: "A friend request already exists between these users.",
        });
      }

      const freindRequest = await FriendRequest.create({
        sender: senderId,
        recipient: recipientId,
      });

      res.status(201).json({ message: "Friend request sent successfully." });
    } catch (error) {
      console.error("Error sending friend request:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  acceptFreindRequest: async (req, res) => {
    try {
      const { id: requestId } = req.params;

      const freindRequest = await FriendRequest.findById(requestId);

      if (!freindRequest) {
        return res.status(404).json({ message: "Friend request not found." });
      }

      if (freindRequest.recipient.toString() !== req.user.id) {
        return res.status(403).json({
          message: "You are not authorized to accept this friend request.",
        });
      }

      freindRequest.status = "accepted";
      await freindRequest.save();

      await User.findByIdAndUpdate(freindRequest.sender, {
        $addToSet: { freinds: freindRequest.recipient },
      });

      await User.findByIdAndUpdate(freindRequest.recipient, {
        $addToSet: { freinds: freindRequest.sender },
      });

      res.status(200).json({ message: "Friend request accepted." });
    } catch (error) {
      console.error("Error accepting friend request:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getFreindrequests: async (req, res) => {
    try {
      const incomingRequests = await FriendRequest.find({
        recipient: req.user.id,
        status: "pending",
      }).populate("sender", "fullName bio profilePic nativeLanguage");

      const acceptedRequests = await FriendRequest.find({
        $or: [
          { sender: req.user.id, status: "accepted" },
          { recipient: req.user.id, status: "accepted" },
        ],
      })
        .populate("sender", "fullName bio profilePic nativeLanguage")
        .populate("recipient", "fullName bio profilePic nativeLanguage");

      res.status(200).json({
        incomingRequests,
        acceptedRequests,
      });
    } catch (error) {
      console.error("Error fetching friend requests:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  alreadySentRequest: async (req, res) => {
    try {
      const alreadySent = await FriendRequest.find({
        sender: req.user.id,
        status: "pending",
      }).populate("recipient", "fullName bio profilePic nativeLanguage");

      res.status(200).json({ requests: alreadySent });
    } catch (error) {
      console.error("Error checking existing friend request:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Update user's language preferences for translation
  updateLanguagePreferences: async (req, res) => {
    try {
      const { preferredLanguage, autoTranslate } = req.body;
      const userId = req.user.id;

      // Build update object with only provided fields
      const updateData = {};
      if (preferredLanguage !== undefined) {
        updateData.preferredLanguage = preferredLanguage;
      }
      if (autoTranslate !== undefined) {
        updateData.autoTranslate = autoTranslate;
      }

      // Update user preferences
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        select: "-password",
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "Language preferences updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating language preferences:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
