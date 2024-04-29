const mongoose = require('mongoose');
const schema = mongoose.Schema;

const schoolAdminSchema = new schema({
    adminName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    }
});

const schoolAdmin = mongoose.model("school-admin", schoolAdminSchema);
module.exports = schoolAdmin;