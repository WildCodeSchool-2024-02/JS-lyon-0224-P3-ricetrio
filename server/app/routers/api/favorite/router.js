const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, like } = require("../../../controllers/favoriteActions");

// Route to get a list of items
router.get("/", browse);

router.post("/", like);

/* ************************************************************************* */

module.exports = router;