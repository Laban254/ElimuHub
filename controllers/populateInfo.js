
const {generateApiKey, generateAuthKey} = require("./powerHouse")
const accesKey = require('../models/acces-keys');



const populate_keys = (email, password) => {
  const keys = generateApiKey(email, password);
  const apiKey = keys.encryptedData;
  const iv = keys.iv;
  const decryptionKey = keys.key;

  console.log('Generated apiKey:', apiKey);
  console.log('Email:', email);
  console.log('Password:', password);

  accessKey.create({ apiKey: apiKey, iv: iv, decryptionKey: decryptionKey }).then(() => {
    console.log("keys posted successfully");
  });
};


const populateAuthKeys = async (req, res) => {
  try {
    // Extract and trim the apiKey from the request parameters
    const apiKey = req.params.apiKey;

    // Check if the apiKey is empty or invalid
    if (!apiKey) {
      console.log('Invalid apiKey provided');
      return res.status(400).send('Invalid apiKey');
    }

    // Log information about the received apiKey
    console.log('Received apiKey:', apiKey, 'Length:', apiKey.length);

    // Check if the document with the specified apiKey exists
    const existingDocument = await accesKey.findOne({ apiKey: apiKey });

    if (!existingDocument) {
      console.log('No document found with the provided apiKey');
      return res.status(404).send('No document found with the provided apiKey');
    }

    // Generate a new authKey
    const authKey = generateAuthKey();

    // Update the document with the new authKey
    const updatedDocument = await accesKey.findOneAndUpdate(
      { apiKey: apiKey },
      { authKey: authKey },
      { new: true }
    );

    if (updatedDocument) {
      console.log('Document updated successfully');
      res.send(updatedDocument.authKey);
    } else {
      console.log('Failed to update document');
      res.status(500).send('Failed to update document');
    }
  } catch (error) {
    console.error('Error in populateAuthKeys:', error);
    res.status(500).send('Internal server error');
  }
};

module.exports = {populate_keys, populateAuthKeys }