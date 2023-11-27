const mongoose = require('mongoose');
const schema = mongoose.Schema;

const resourceSchema = new schema({
    resourceName: {
        type: String,
        required: true,
        unique: true
    },
    resourceLocation: {
        type: String,
        required: true,
        unique: true
    },
    resourceType:{
        type: String,
        required: true
    }
});

const resourceModel = mongoose.model('resource', resourceSchema);

module.exports = resourceModel;