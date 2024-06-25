const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { login } = require("../../../controllers/authActions");

router.post("/login", login);

/* ************************************************************************* */

module.exports = router;
