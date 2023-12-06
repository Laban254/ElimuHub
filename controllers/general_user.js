

const bcrypt = require("bcrypt")
// This file contains all the controls related to any user of the system
const User = require('../models/users');

const home = (req, res) => {
    console.log("Welcome to ElimuHub :)");


}

const logIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Replace this with your actual user authentication logic (e.g., querying a database)
  console.log(email)
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      // User not found
      console.log('User not found');
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // Use bcrypt.compare to compare the provided password with the hashed password in the database
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error('Error comparing passwords', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (result) {
        // Passwords match, user successfully logged in
        console.log('Successful login');
        return res.status(200).json({ message: 'Successful login' });
      } else {
        // Passwords do not match
        console.log('Incorrect password');
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
    });
  }).catch((err) => {
    console.error('Error finding user', err);
    return res.status(500).json({ message: 'Internal server error' });
  });
};



const delete_user = async(req, res) => {
    const userId = req.params.userId;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {

      return res.status(404).json({ message: 'User not found' });

    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports = {home, delete_user, logIn}

