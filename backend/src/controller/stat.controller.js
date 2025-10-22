import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getAllStat = async (req, res) => {
  try {
    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),
        Song.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    res.json({
      totalSongs,
      totalAlbums,
      totalUsers,
      totalArtists: uniqueArtists[0]?.count || 0,
    });
  } catch (error) {
    console.error(`An error occurred while fetching the stats: ${error}`);
  }
};
