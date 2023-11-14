const express = require('express');
const { createSchoolAdmin } = require('../controllers/system-admin.js')
const app = express();

// creation of the router object
const router = express.Router();

router.use(express.json());

// insert all routes associated with the system admin under
router.post('/create-admin', createSchoolAdmin);

module.exports = router;