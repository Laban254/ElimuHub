// This is the model that contains information of all the users in the syste.
// The information associated to this model is the user email, password, and user type.
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const logInSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType:{
        type: String,
        required: true
    }
});

logInSchema.pre('save', function(next){
    const user = this 
    
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
});



const user = mongoose.model('User', logInSchema);
module.exports = user;