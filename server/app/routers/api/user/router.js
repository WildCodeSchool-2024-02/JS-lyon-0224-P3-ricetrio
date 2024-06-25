const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import offer-related actions
const { browse, add } = require("../../../controllers/userActions");
const { hashPassword } = require("../../../services/auth");

// Route to get a list of offers
router.get("/", browse);

router.post("/", hashPassword, add);

/* ************************************************************************* */

module.exports = router;
