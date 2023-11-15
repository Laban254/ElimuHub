const users = require('../models/users.js')
// This file contains all the controls related to any user of the system
const home = (req, res) => {
    console.log("Welcome to ElimuHub :)");
    res.end("Welcome to ElimuHub :)");
}
const logIn = (req, res ) => {
  const email = req.body.email;
  const password = req.body.password;
// Replace this with your actual user authentication logic (e.g., querying a database)
  users.findOne({email:email}).then(() => {
    if (users.password === password)
      console.log('successful log in')
    else 
    console.log('incorrect password')
  });

  
    }
module.exports = {home, logIn}