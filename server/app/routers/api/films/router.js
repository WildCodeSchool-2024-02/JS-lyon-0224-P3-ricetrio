const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  read,
  add,
  destroy,
} = require("../../../controllers/filmActions");

// Route to get a list of items
router.get("/", browse);

// Route to get a specific item by ID
router.get("/:id", read);

router.post("/", add);

router.delete("/delete", destroy);

/* ************************************************************************* */

module.exports = router;
