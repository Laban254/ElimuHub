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
    const email = req.body.email;
    const password = passwordGenerator();
    const userType = "student";
    const studentAdministration = req.body.studentAdministration;
    const studentName = req.body.studentName;
    const studentClass = req.body.studentClass;
    const parentName = req.body.parentName;
    const parentPhoneNumber = req.body.parentPhoneNumber;
    const schoolName = req.body.schoolName;

    const filename = path.resolve(__dirname,`../public/QRcode-images/${studentName}.png`);
    const url = "https://github.com/atonya-bravin/IntAlert/blob/main/Server.js";
    generateQRCode(url, filename);
    
    const QRcode = filename;
    
    const user = await logInModel.create({email: email, password: password, userType: userType});
    const student = await studentModel.create({
        studentAdministration: studentAdministration,
        studentName: studentName,
        QRcode: QRcode,
        studentClass: studentClass,
        parentName: parentName,
        parentPhoneNumber: parentPhoneNumber,
        schoolName: schoolName
    });
    populate_keys(email, password);
    res.send( student);
}

const createMentor = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const userType = "mentor";
    const mentorName = req.body.mentorName;
    const mentorPhoneNumber = req.body.mentorPhoneNumber;

    const user = await logInModel.create({email: email, password: password, userType: userType});
    const mentor = await mentorModel.create({
        mentorName: mentorName,
        mentorPhoneNumber: mentorPhoneNumber
    });
    populate_keys(email, password);
    res.send(mentor)
}

module.exports = { createStudent, createMentor};