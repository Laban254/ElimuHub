
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
        unique: true,
        default: undefined
    }


});

const accesKey = mongoose.model('acces-key', accesSchema);
module.exports = accesKey;