const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { login } = require("../../../controllers/authActions");
const { verifyToken } = require("../../../services/auth");

router.post("/login", verifyToken, login);

/* ************************************************************************* */

module.exports = router;
