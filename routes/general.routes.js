const express = require("express");
const { home, delete_user } = require("../controllers/general_user.js");
const app = express();

// creation of a router object
const router = express.Router();

// insert all the main routes associated with the general user under
router.get("/", home);
router.delete("/delete_user/:userId", delete_user);

module.exports = router;

