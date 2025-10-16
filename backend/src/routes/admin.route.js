import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("get method in admin route");
});

export default router
