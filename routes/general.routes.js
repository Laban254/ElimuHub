const express = require("express");
const { home, delete_user, logIn, cliLogin } = require("../controllers/general_user.js");
const { generateAndPopulateSession, checkSessionValidity} = require('../controllers/powerHouse.js');
const session = require('express-session');
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

router.use(express.json());

// insert all the main routes associated with the general user under

router.get("/", home);
router.get('/startSession', generateAndPopulateSession);
router.get('/sessionValidity', checkSessionValidity)
router.delete("/delete_user/:userId", delete_user);
router.get("/:apiKey", cliLogin);
router.get("/populateAuthKey", populateAuthKeys)

router.post("/login", logIn)

module.exports = router;

