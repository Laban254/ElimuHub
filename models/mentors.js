// This is the model containing information about the mentors in the system.

const mongoose = require('mongoose');
const schema = mongoose.Schema;

//  Clear Models Cache
mongoose.models = {};

const mentorSchema = new schema({
    mentorName: {
        type: String,
        required: true
    },
    mentorPhoneNumber: {
        type: String,
        required: true
    }
});

const mentor = mongoose.model('mentor', mentorSchema);

module.exports = mentor;