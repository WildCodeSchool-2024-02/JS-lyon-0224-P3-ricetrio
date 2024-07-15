const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  read,
  addFavorite,
  removeFavorite,
} = require("../../../controllers/favoriteActions");

// Route to get a list of items
// router.get("/", browse); // Get all favorites for a user
router.get("/:userId", read); // Get all favorites for a user
router.post("/", addFavorite); // Add a favorite
router.delete("/", removeFavorite); // Remove a favorite

/* ************************************************************************* */

module.exports = router;
