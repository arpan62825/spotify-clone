import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    const user = await mongoose.findOne({ clerkId: id });

    if (!user) {
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }

    res.status(200).json({ id, firstName, lastName, imageUrl });
  } catch (error) {
    console.error(
      `Error occurred in the '/callback' route while creating new User: ${error}`
    );
  }
};
