// This is the model that contains all the information about the schools in the system.

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const schoolSchema = new schema({
    schoolName: {
        type: String,
        required: true
    },
    schoolLocation: {
        type: String,
        required: true
    }
});

const schoolModel = mongoose.model('school', schoolSchema);
module.exports = schoolModel;