const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const filmsRouter = require("./films/router");

router.use("/films", filmsRouter);

const usersRouter = require("./user/router");

router.use("/users", usersRouter);

const authRouter = require("./auth/router");

router.use("/login", authRouter);

const favoriteRouter = require ("./favorite/router");

router.use("/favorite", favoriteRouter)

// const adminRouter = require("./admin/router");

// router.use("/admin", adminRouter);

/* ************************************************************************* */

module.exports = router;
