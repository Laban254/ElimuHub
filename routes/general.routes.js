const express = require("express");
const { home, logIn } = require("../controllers/general_user.js");
const app = express();

// creation of a router object
const router = express.Router();
router.use(express.json())
// insert all the main routes associated with the general user under

router.get("/", home);
router.post('/login', logIn)

module.exports = router;

