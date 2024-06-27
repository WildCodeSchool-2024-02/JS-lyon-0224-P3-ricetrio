const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { read, login } = require("../../../controllers/authActions");
const { verifyToken } = require("../../../services/auth");

router.post("/", login);
router.get("/id", verifyToken, read);

/* ************************************************************************* */

module.exports = router;
