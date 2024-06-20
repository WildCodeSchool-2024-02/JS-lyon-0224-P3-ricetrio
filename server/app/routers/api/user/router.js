const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const { add } = require("../../../controllers/userActions");

router.get("/", add);

/* ************************************************************************* */

module.exports = router;
