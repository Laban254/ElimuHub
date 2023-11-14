const express = require('express');
const { createStudent, createMentor } = require('../controllers/school-admin.js');
const router = express.Router();

// parse the information in the body
router.use(express.json());

router.post('/create-student',createStudent);
router.post('/create-mentor', createMentor);

module.exports = router;