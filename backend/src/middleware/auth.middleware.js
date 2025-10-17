import { clerkClient } from "@clerk/express";
import dotenv from "dotenv";
dotenv.config();

export const protectRoute = async (req, res, next) => {
  if (!req.auth.userId) {
    return res
      .status(401)
      .json({ message: "User is unauthorized - you must be signed in" });
  }

  next();
};

export const isAdmin = async (req, res, next) => {
  try {
    const currentUser = clerkClient.users.getUser(req.auth.UserId);

    const isAdmin =
      (await currentUser)?.primaryEmailAddress.emailAddress ===
      process.env.ADMIN_EMAIL;

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "User is unauthorized - you must be an admin" });
    }

    next();
  } catch (error) {}
};
