const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const { browse } = require("../../controllers/videoActions");

router.get("/", browse);

const videosRouter = require("./videos/router");

router.use("/videos", videosRouter);

const filmsRouter = require("./films/router");

router.use("/films", filmsRouter);

/* ************************************************************************* */

module.exports = router;
