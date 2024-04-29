// This file contains all the controls related to the system admin

const express = require('express');
const app = express();
require('./database.js')

const logInModel = require('../models/users.js');
const schoolAdminModel = require('../models/school-admin.js');
const schoolModel = require('../models/schools.js');
const {populate_keys} = require('./populateInfo.js')

const createSchoolAdmin = async (req, res) => {
    try {
        const { phoneNumber, schoolName, adminName, schoolLocation, email, password } = req.body;
        
        // Define an array to store missing fields
        const missingFields = [];

        // Check each field and add missing ones to the array
        if (!phoneNumber) missingFields.push('phoneNumber');
        if (!schoolName) missingFields.push('schoolName');
        if (!adminName) missingFields.push('adminName');
        if (!schoolLocation) missingFields.push('schoolLocation');
        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');

        // If there are missing fields, return error response
        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
        }

        // Check if the email already exists in the user model
        const existingUser = await logInModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        // Check if the phone number already exists in the school admin model
        const existingPhoneNumber = await schoolAdminModel.findOne({ phoneNumber });
        if (existingPhoneNumber) {
            return res.status(400).json({ error: 'Phone number is already in use' });
        }

        // Check if the school name already exists in the school model
        const existingSchool = await schoolModel.findOne({ schoolName });
        if (existingSchool) {
            return res.status(400).json({ error: 'School name is already in use' });
        }

        // Create user, school admin, and school
        const user = await logInModel.create({ email, password, userType: 'school-admin' });
        const schoolAdmin = await schoolAdminModel.create({ adminName, phoneNumber});
        const school = await schoolModel.create({ schoolName, schoolLocation });

        // Populate keys
        populate_keys(email, password);

        // Send success response with created school admin
        res.status(201).json({ schoolAdmin });
    } catch (error) {
        console.error('Error creating school admin:', error);

        // Generic error response
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { createSchoolAdmin };