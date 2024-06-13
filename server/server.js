const express = require("express");
const cors = require("cors");
const videoRouter = require("./app/routers/api/videos/router");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/videos", videoRouter);

const APP_PORT = process.env.PORT || 3310;
app.listen(APP_PORT, () => {});
