import cloudinary from "../lib/cloudinary.js";
import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });

    return (await result).secure_url;
  } catch (error) {
    console.error(`An error occurred while uploading to cloudinary: ${error}`);
  }
};

export const createSong = async (req, res) => {
  try {
    if (!req.files || !req.files.imageFile || !req.files.audioFile) {
      return res.status(400).json({ message: "Please upload all the files" });
    }
    const { title, artist, duration, albumId } = req.body;

    const imageFile = req.files.imageFile;
    const audioFile = req.files.audioFile;

    const imageUrl = await uploadToCloudinary(imageFile);
    const audioUrl = await uploadToCloudinary(audioFile);

    const song = new Song({
      title,
      artist,
      imageUrl,
      audioUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: {
          song: song._id,
        },
      });
    }
  } catch (error) {
    console.error(`an error occurred while uploading the song: ${error}`);
  }
};

export const deleteSong = async (req, res) => {
  try {
    const { songId } = req.param;

    const song = Song.findById(songId);

    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { song: song._id },
      });
    }

    await Song.findByIdAndDelete(songId);

    res.json({ message: "Song deleted successfully" });
  } catch (error) {
    console.error(`An error occurred while deleting the song: ${error}`);
  }
};
