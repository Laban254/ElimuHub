const express = require("express");



const { home, delete_user, logIn } = require("../controllers/general_user.js");

const {populateAuthKeys} = require("../controllers/populateInfo.js");



// creation of a router object
const router = express.Router();
router.use(express.json())
// insert all the main routes associated with the general user under

router.get("/", home);

router.delete("/delete_user/:userId", delete_user);
router.get("/:apiKey", populateAuthKeys);
router.post("/login", logIn)

module.exports = router;

