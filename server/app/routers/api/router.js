const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const filmsRouter = require("./films/router");

router.use("/films", filmsRouter);

/* ************************************************************************* */

module.exports = router;
