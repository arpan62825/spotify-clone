import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("GET method in album route");
});

export default router;
