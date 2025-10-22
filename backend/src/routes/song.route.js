import { Router } from "express";
import { protectRoute, isAdmin } from "../middleware/auth.middleware.js";
import {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
} from "../controller/song.controller.js";

const router = Router();

router.get("/", protectRoute, isAdmin, getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/trending", getTrendingSongs);
router.get("/made-for-you", getMadeForYouSongs);

export default router;
