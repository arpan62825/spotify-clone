// import dependencies
import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import path from "path";
import cors from "cors";

// ...
import { connectToDatabase } from "./lib/database.js";

// import Routes
import albumRoutes from "./routes/album.route.js";
import songRoutes from "./routes/song.route.js";
import authRoutes from "./routes/auth.route.js";
import statRoutes from "./routes/stat.route.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";

const __dirname = path.resolve();
dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Clerk-Redirect-To",
      "Clerk-Token",
    ],
  }),
);

app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/album", albumRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/song", songRoutes);
app.use("/api/stat", statRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectToDatabase();
  console.log(`Server is running on port ${PORT}`);
});

// TODO: implement socket.io
