// server.js or app.js

const express = require("express");
const cors = require("cors");
const videoRouter = require("./app/routers/api/videos/router"); // Adjust the path as necessary

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Use the videoRouter for routes starting with /api/videos
app.use("/api/videos", videoRouter);

// Set up the server to listen on a specific port
const APP_PORT = process.env.PORT || 3310;
app.listen(APP_PORT, () => {
  console.log(`Server running on port ${APP_PORT}`);
});
