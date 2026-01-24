import { User } from "../models/user.model.js";
import { getAuth } from "@clerk/express";

export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.auth.userId;
    const users = await User.find({ clerkId: { $ne: currentUserId } });
    res.json(users);
  } catch (error) {
    console.error(`An error occurred while fetching all the users: ${error}`);
  }
};
