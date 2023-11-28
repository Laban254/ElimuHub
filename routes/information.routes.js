const express = require('express');
const router = express.Router();
const {getStudentInformation, getMentorInformation, getSchoolInformation} = require('../controllers/info-hub.js');

router.use(express.json());

router.get('/student/:administrationNumber', getStudentInformation);
router.get('/mentor/:phoneNumber', getMentorInformation);
router.get('/school/:schoolName', getSchoolInformation);

module.exports = router;