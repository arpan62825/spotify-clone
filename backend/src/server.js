// import dependencies
import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

// ...
import { connectToDatabase } from "./lib/database.js";

// import Routes
import albumRoutes from "./routes/album.route.js";
import songRoutes from "./routes/song.route.js";
import authRoutes from "./routes/auth.route.js";
import statRoutes from "./routes/stat.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/album", albumRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/song", songRoutes);
app.use("/api/stat", statRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectToDatabase();
  console.log(`Server is running on port ${PORT}`);
});
