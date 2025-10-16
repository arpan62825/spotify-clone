import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("GET method in song route");
});

export default router;
