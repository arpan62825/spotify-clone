import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });

    res.json(songs);
  } catch (error) {
    console.error(`An error occurred while fetching all the songs: ${error}`);
  }
};

export const getFeaturedSongs = async (req, res) => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size: 6 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    console.error(
      `An error occurred while fetching the featured songs: ${error}`
    );
  }
};

export const getTrendingSongs = async (req, res) => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    console.error(
      `An error occurred while fetching the trending songs: ${error}`
    );
  }
};

export const getMadeForYouSongs = async (req, res) => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    console.error(
      `An error occurred while fetching the made-for-you songs: ${error}`
    );
  }
};
