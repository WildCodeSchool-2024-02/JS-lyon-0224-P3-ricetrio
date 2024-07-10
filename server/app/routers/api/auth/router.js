const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { login } = require("../../../controllers/authActions");
const { read } = require("../../../controllers/userActions");
const { verifyToken } = require("../../../services/auth");
// const checkAdminRole = require("../../../services/checkAdminRole");

router.post("/", login);
router.get("/:id", verifyToken, read);

/* ************************************************************************* */

module.exports = router;
