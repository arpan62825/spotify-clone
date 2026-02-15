import { Router } from "express";
import { isAdmin, protectRoute } from "../middleware/auth.middleware.js";
import {
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controller/admin.controller.js";
import multer from "multer"

const upload = multer({
  storage: multer.memoryStorage()
})

const router = Router();

router.post("/songs", protectRoute, isAdmin,upload.single('audio'), createSong);
router.delete("/songs/:id", protectRoute, isAdmin, deleteSong);

router.post("/albums/", protectRoute, isAdmin, createAlbum);
router.delete("/albums/:id", protectRoute, isAdmin, deleteAlbum);

export default router;
