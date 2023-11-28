const studentModel = require('../models/students.js');
const mentorModel = require('../models/mentors.js');
const schoolModel = require('../models/schools.js');

const getStudentInformation = async (req, res) => {
    const admissionNumber = req.params.administrationNumber;
    const student = await studentModel.findOne({studentAdministration: admissionNumber});
    res.send(student);
};

const getMentorInformation = async (req, res) => {
    const phoneNumber = req.params.phoneNumber;
    const mentor = await mentorModel.findOne({mentorPhoneNumber: phoneNumber});
    res.send(mentor);
};

const getSchoolInformation = async (req, res) => {
    const schoolName = req.params.schoolName;
    const school = await schoolModel.findOne({schoolName: schoolName});
    res.send(school);
};

module.exports = {getStudentInformation, getMentorInformation, getSchoolInformation};