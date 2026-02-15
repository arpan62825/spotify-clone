import cloudinary from "../lib/cloudinary.js";
import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import mm from "music-metadata";

const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "video" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      },
    );

    stream.end(fileBuffer);
  });
};

export const createSong = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Audio file is required" });
    }

    const metadata = await mm.parseBuffer(req.file.buffer, req.file.mimetype);

    const picture = metadata.common.picture?.[0];

    const imageUrl = picture
      ? `data:${picture.format};base64,${picture.data.toString("base64")}`
      : null;

    const audioUrl = await uploadToCloudinary(req.file.buffer);

    const song = new Song({
      title: metadata.common.title || "Unknown Title",
      artist: metadata.common.artist || "Unknown Artist",
      imageUrl,
      audioUrl,
      duration: metadata.format.duration,
    });

    await song.save();

    return res.status(201).json(song);
  } catch (error) {
    console.error(`an error occurred while uploading the song: ${error}`);
  }
};

export const deleteSong = async (req, res) => {
  try {
    const { songId } = req.params;

    const song = await Song.findById(songId);

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

export const createAlbum = async (req, res) => {
  try {
    if (!req.files || !req.files.imageFile) {
      return res
        .status(400)
        .json({ message: "Problem getting the album cover." });
    }

    const { title, artist, releaseYear } = req.body;

    const imageFile = req.files.imageFile;

    const imageUrl = uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    await album.save();
  } catch (error) {
    console.error(`An error occurred while creating the album: ${error}`);
  }
};

export const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.error(`An error occurred while deleting the album: ${error}`);
  }
};
