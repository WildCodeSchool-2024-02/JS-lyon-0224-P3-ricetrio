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

const usersRouter = require("./user/router");

router.use("/users", usersRouter);

/* ************************************************************************* */

module.exports = router;
