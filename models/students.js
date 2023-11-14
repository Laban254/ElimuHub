// This is the model that contains information associated with the students

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const studentSchema = new schema({
    studentAdministration: {
        type: String,
        required: true, 
        unique: true
    },
    studentName: {
        type: String,
        required: true,
    },
    QRcode: {
        type: String,
        required: true,
        unique: true
    },
    studentClass: {
        type: String,
        required: true
    },
    parentName: {
        type: String,
        required: true
    },
    parentPhoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    schoolName: {
        type: String,
        required: true
    }
});

const student = mongoose.model('student', studentSchema);

module.exports = student;