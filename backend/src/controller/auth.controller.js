import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, fullName, imageUrl } = req.body;

    const user = await User.findOne({ clerkId: id });

    if (!user) {
      await User.create({
        clerkId: id,
        fullName,
        imageUrl,
      });
    }

    res.status(200).json({ id, fullName, imageUrl });
  } catch (error) {
    console.error(
      `Error occurred in the '/callback' route while creating new User: ${error}`
    );
  }
};
