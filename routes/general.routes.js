const express = require("express");
const { home } = require("../controllers/general_user.js");
const app = express();

// creation of a router object
const router = express.Router();

// insert all the main routes associated with the general user under
router.get("/", home);

module.exports = router;

