import { Router } from "express";
import { isAdmin, protectRoute } from "../middleware/auth.middleware.js";
import { getAllStat } from "../controller/stat.controller.js";

const router = Router();

router.get("/", protectRoute, isAdmin, getAllStat);

export default router;
