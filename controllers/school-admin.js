const express = require('express');
const app = express();
require('./database.js');
const {populate_keys} = require('./populateInfo.js')

const logInModel = require('../models/users.js');
const studentModel = require('../models/students.js');
const mentorModel = require('../models/mentors.js');
const {generateQRCode, passwordGenerator} = require('../controllers/powerHouse.js');
const path = require('path');

// This file contains all the controls related to the school admin creating the students.
const createStudent = async (req, res) => {
    try {
        const { email, studentAdministration, studentName, studentClass, parentName, parentPhoneNumber, schoolName } = req.body;

        // Check for missing fields
        const missingFields = [];
        if (!email) missingFields.push('email');
        if (!studentAdministration) missingFields.push('studentAdministration');
        if (!studentName) missingFields.push('studentName');
        if (!studentClass) missingFields.push('studentClass');
        if (!parentName) missingFields.push('parentName');
        if (!parentPhoneNumber) missingFields.push('parentPhoneNumber');
        if (!schoolName) missingFields.push('schoolName');

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
        }

        // Check if the email already exists
        const existingUser = await logInModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        // Check if the parent phone number already exists
        const existingParentPhoneNumber = await studentModel.findOne({ parentPhoneNumber });
        if (existingParentPhoneNumber) {
            return res.status(400).json({ error: 'Parent phone number is already in use' });
        }

        // Check if the student administration already exists
        const existingStudentAdministration = await studentModel.findOne({ studentAdministration });
        if (existingStudentAdministration) {
            return res.status(400).json({ error: 'Student administration is already in use' });
        }

        // Create a random password
        const password = passwordGenerator();

        // Generate QR code
        const filename = path.resolve(__dirname, `../public/QRcode-images/${studentName}.png`);
        const url = "https://github.com/atonya-bravin/IntAlert/blob/main/Server.js";
        generateQRCode(url, filename);
        const QRcode = filename;

        // Create user and student
        const user = await logInModel.create({ email, password, userType: 'student' });
        const student = await studentModel.create({
            studentAdministration,
            studentName,
            QRcode,
            studentClass,
            parentName,
            parentPhoneNumber,
            schoolName
        });

        // Populate keys
        populate_keys(email, password);

        // Send success response
        res.status(201).json({ student });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const createMentor = async (req, res) => {
    try {
        const { email, password, mentorName, mentorPhoneNumber } = req.body;

        // Check for missing fields
        const missingFields = [];
        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');
        if (!mentorName) missingFields.push('mentorName');
        if (!mentorPhoneNumber) missingFields.push('mentorPhoneNumber');

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
        }

        // Check if the email already exists
        const existingUser = await logInModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        // Check if the mentor phone number already exists
        const existingMentorPhoneNumber = await mentorModel.findOne({ mentorPhoneNumber });
        if (existingMentorPhoneNumber) {
            return res.status(400).json({ error: 'Mentor phone number is already in use' });
        }

        // Create user and mentor
        const user = await logInModel.create({ email, password, userType: 'mentor' });
        const mentor = await mentorModel.create({
            mentorName,
            mentorPhoneNumber
        });

        // Populate keys
        populate_keys(email, password);

        // Send success response
        res.status(201).json({ mentor });
    } catch (error) {
        console.error('Error creating mentor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { createStudent, createMentor};