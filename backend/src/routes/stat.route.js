import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("GET method in stat route");
});

export default router;
