const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, read, add } = require("../../../controllers/filmActions");

// Route to get a list of items
router.get("/", browse);

router.post("/", add);

// Route to get a specific item by ID
router.get("/:id", read);

/* ************************************************************************* */

module.exports = router;
