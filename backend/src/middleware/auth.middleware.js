import { clerkClient, getAuth } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res
      .status(401)
      .json({ message: "User is unauthorized - you must be signed in" });
  }

  next();
};

export const isAdmin = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    const currentUser = clerkClient.users.getUser(userId);

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
