const bcrypt = require("bcryptjs")
// This file contains all the controls related to any user of the system
const User = require('../models/users');
const {populateAuthKeys} = require('./populateInfo')
const {findUserByEmailAndPassword} = require('./powerHouse')
const accesKey = require('../models/acces-keys');
const {decryptApiKey} = require("./powerHouse")

const home = (req, res) => {
    console.log("Welcome to ElimuHub :)");
}
const logIn = (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    console.log(email);
    
    // Call the function and pass the Express response object
    findUserByEmailAndPassword(email, password, res);
  } catch (error) {
    console.error('Error in login route handler:', error);
    res.status(500).send('Internal Server Error');
  }
};

const cliLogin = async (req, res) => {
  try {
    // Extract the API key from the request parameters
    const apiKey = req.params.apiKey;

    // Find document with the provided apiKey in the database
    const existingDocument = await accesKey.findOne({ apiKey });

    if (!existingDocument) {
      // Handle the case where no document is found for the provided apiKey
      console.log('No document found with the provided apiKey');
      return res.status(404).send('No document found with the provided apiKey');
    }

    // Retrieve decryptionKeyString and ivString from the database document
    const decryptionKey = Buffer.from(existingDocument.decryptionKey, 'hex');
    const iv = Buffer.from(existingDocument.iv, 'hex');

    // Decrypt the apiKey using decryptionKey and iv
    const decrypted = await decryptApiKey(apiKey, decryptionKey, iv);

    // Parse the decrypted API Key JSON string into a JavaScript object
    const apiKeyObject = JSON.parse(decrypted);

    // Destructure the apiKeyObject to extract email and password
    const { email, password } = apiKeyObject;

    // Example: Perform further actions with email and password
    findUserByEmailAndPassword(email, password, res);
  } 
  catch (error) {
    // Handle any errors that occur during the process
    console.error('Error processing CLI login:', error.message);
    return res.status(500).send('Internal Server Error');
  }
};
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
module.exports = {home, delete_user, logIn, cliLogin}
