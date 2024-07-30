const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { login } = require("../../../controllers/authActions");
const { read } = require("../../../controllers/userActions");
const {
  verifyToken,
  verifyCookie,
  verifyIsAdmin,
} = require("../../../services/auth");

router.post("/", login);
router.get("/:id", verifyToken, read);
router.get("/admin", verifyCookie, verifyIsAdmin);

/* ************************************************************************* */

module.exports = router;
