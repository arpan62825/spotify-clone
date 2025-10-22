import { Album } from "../models/album.model.js";

export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    console.error(`An error occurred while finding albums: ${error}`);
  }
};

export const getAlbumById = async (req, res) => {
  try {
    const { albumId } = req.params;
    const album = await Album.findById(albumId).populate("songs");

    res.status(200).json(album);
  } catch (error) {
    console.error(
      `An error occurred while finding album using the given ID: ${error}`
    );
  }
};
