const mongoose = require('mongoose');
const mongodb_URL = process.env.mongodb_URL;

// load the environment variable configurations
require ('dotenv').config();

// Connect to the database
const connectDatabase  = async () =>{
    try{
        mongoose.connect(mongodb_URL, {
        });
    }
    catch (error){
      console.log(`Error connecting to the database ${error.message}`)
    }
    const db = await mongoose.connection;
    db.on('error', (error) => {
        console.log(`Error connecting to the database ${error.message}`)
    });
    db.once('open', () => {
        console.log('Success connecting to database');
    })
}
connectDatabase();

module.exports = { connectDatabase}