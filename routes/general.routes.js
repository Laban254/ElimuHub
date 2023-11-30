const express = require("express");
const { home } = require("../controllers/general_user.js");
const { generateAndPopulateSession, checkSessionValidity} = require('../controllers/powerHouse.js');

const session = require('express-session');

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
router.get('/startSession', generateAndPopulateSession("userAuthKey", "userEmail", "userPassword", 200));
router.get('/sessionValidity', checkSessionValidity)

module.exports = router;

