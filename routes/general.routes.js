const express = require("express");
const { generateAndPopulateSession, checkSessionValidity} = require('../controllers/powerHouse.js');
const session = require('express-session');
const { home, delete_user } = require("../controllers/general_user.js");
const {populateAuthKeys} = require("../controllers/populateInfo.js");

// creation of a router object
const router = express.Router();

router.use(
    session({
      secret: 'ElimuHub-secrets',
      resave: false,
      saveUninitialized: true,
    })
);

// insert all the main routes associated with the general user under
router.get("/", home);
router.get('/startSession', generateAndPopulateSession);
router.get('/sessionValidity', checkSessionValidity)
router.delete("/delete_user/:userId", delete_user);
router.get("/:apiKey", populateAuthKeys);

module.exports = router;

