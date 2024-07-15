const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, like, read } = require("../../../controllers/favoriteActions");

// Route to get a list of items
router.get("/:filmid/:userid", browse);

router.get("/title", read);

router.post("/", like);

/* ************************************************************************* */

module.exports = router;