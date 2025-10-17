import { Router } from "express";
import { isAdmin, protectRoute } from "../middleware/auth.middleware.js";
import { createSong, deleteSong } from "../controller/admin.controller.js";

const router = Router();

router.get("/songs", protectRoute, isAdmin, createSong);
router.delete("/songs/:id", protectRoute, isAdmin, deleteSong);

export default router;
