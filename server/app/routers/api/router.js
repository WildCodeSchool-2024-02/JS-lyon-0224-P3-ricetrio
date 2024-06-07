const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const videosRouter = require("./videos/router");

router.use("/videos", videosRouter);

/* ************************************************************************* */

module.exports = router;
