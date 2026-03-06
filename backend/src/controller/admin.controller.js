import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";
import { parseBuffer } from "music-metadata";
import fs from "fs";

// cloudinary uploads
const uploadToCloudinary = async (file, folder = "songs") => {
  try {
    return new Promise((resolve, reject) => {
      const data = Buffer.isBuffer(file)
        ? file
        : file?.buffer && Buffer.isBuffer(file.buffer)
          ? file.buffer
          : Buffer.from(file);

      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder,
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        },
      );

      stream.end(data);
    });
  } catch (error) {
    console.error("Error in uploadToCloudinary", error);
    throw new Error("Error uploading to cloudinary");
  }
};

export const extractSongMetadata = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Audio file is required" });
    }

    const audioFile = req.file;

    // Parse metadata using music-metadata (buffer from multer memoryStorage)
    const metadata = await parseBuffer(audioFile.buffer, audioFile.mimetype);

    let extracted = {};

    if (metadata.common.picture && metadata.common.picture.length > 0) {
      const picture = metadata.common.picture[0];
      const base64 = Buffer.from(picture.data).toString("base64");

      extracted = {
        title: metadata.common.title || "Unknown",
        imageUrl: {
          format: picture.format,
          data: base64,
        },
        artist: metadata.common.artist || "Unknown",
        album: metadata.common.album || "Unknown",
        duration: metadata.format.duration
          ? Math.floor(metadata.format.duration)
          : 0,
      };
    }

    res.status(200).json(extracted);
  } catch (error) {
    console.error("Error in extractSongMetadata", error);
    next(error);
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Audio file is required" });
    }

    const audioFile = req.file;

    let { title, artist, albumId, duration } = req.body;

    const metadata = await parseBuffer(audioFile.buffer, audioFile.mimetype);

    title = metadata.common.title || "Unknown";
    artist = metadata.common.artist || "Unknown";
    duration = metadata.format.duration
      ? Math.floor(metadata.format.duration)
      : 0;
    const picture = metadata.common.picture[0];
    const imageFile = picture.data;

    // Upload audio for streaming
    const audioUrl = await uploadToCloudinary(audioFile, "songs/audio");

    // Upload image if provided
    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadToCloudinary(imageFile, "songs/images");
    }

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();

    // // If song belongs to an album, update album
    // if (albumId) {
    //   await Album.findByIdAndUpdate(albumId, {
    //     $push: { songs: song._id },
    //   });
    // }

    res.status(201).json(song);
  } catch (error) {
    console.error("Error in createSong", error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    // if song belongs to an album, update the album's songs array
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.error("Error in deleteSong", error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    await album.save();

    res.status(201).json(album);
  } catch (error) {
    console.error("Error in createAlbum", error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.error("Error in deleteAlbum", error);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};
