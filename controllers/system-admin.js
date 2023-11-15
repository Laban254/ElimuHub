// This file contains all the controls related to the system admin

const express = require('express');
const app = express();
require('./database.js')

const logInModel = require('../models/users.js');
const schoolAdminModel = require('../models/school-admin.js');
const schoolModel = require('../models/schools.js')

const createSchoolAdmin = async (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const schoolName = req.body.schoolName;
    const adminName = req.body.adminName;
    const schoolLocation = req.body.schoolLocation;
    const email = req.body.email;
    const password = req.body.password;
    const userType = "school-admin";
    const user = await logInModel.create({email: email, password: password, userType: userType});
    const schoolAdmin = await schoolAdminModel.create({adminName: adminName, phoneNumber: phoneNumber, schoolName: schoolName});
    const school = await schoolModel.create({schoolName: schoolName, schoolLocation: schoolLocation});
    
    res.send(schoolAdmin)
}

module.exports = {createSchoolAdmin};