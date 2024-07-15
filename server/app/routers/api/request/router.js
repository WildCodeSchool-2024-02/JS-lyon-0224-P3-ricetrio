const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, read, add } = require("../../../controllers/requestActions");

// Route to get a list of items
router.get("/", browse);
router.get("/", read);
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
