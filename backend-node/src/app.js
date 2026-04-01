import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import wardrobeRoutes from "./routes/wardrobe.routes.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();

app.use(cors("*"));
app.use(express.json());

app.get("/", (req, res) => {

  res.json({
    status: "API is running",
    routes: {
      "/auth/register": "POST",
      "/auth/login": "POST",
      "/profile/me": "GET/PUT",
      "/wardrobe/add": "POST",
      "/wardrobe/me": "GET",
      "/wardrobe/:id": "DELETE",
      "/chat": "POST"
    }
  });

});

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/wardrobe", wardrobeRoutes);
app.use("/chat", chatRoutes);

export default app;