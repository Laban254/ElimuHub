

const bcrypt = require("bcrypt")
// This file contains all the controls related to any user of the system
const User = require('../models/users');
const {populateAuthKeys} = require('./populateInfo')
const {findUserByEmailAndPassword} = require('./powerHouse')

const home = (req, res) => {
    console.log("Welcome to ElimuHub :)");


}

const logIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  findUserByEmailAndPassword(email, password)
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

