import { Router } from "express";
import { isAdmin, protectRoute } from "../middleware/auth.middleware.js";
import {
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controller/admin.controller.js";

const router = Router();

router.get("/songs", protectRoute, isAdmin, createSong);
router.delete("/songs/:id", protectRoute, isAdmin, deleteSong);

router.get("/albums/", protectRoute, isAdmin, createAlbum);
router.delete("/albums/:id", protectRoute, isAdmin, deleteAlbum);

export default router;
