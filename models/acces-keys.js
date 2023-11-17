
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const accesSchema = new schema({
    decryptionKey: {
        type: String,
        required: true,
        unique: true

    },
    iv: {
        type: String,
        required: true,
        unique: true
    },
    apiKey: {
        type: String,
        required: true,
        unique: true
    },
    authKey: {
        type: String,
        unique: true
    }


});

const accesKey = mongoose.model('mentor', accesSchema);

module.exports = accesKey;