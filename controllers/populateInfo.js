
const {generateApiKey, generateAuthKey} = require("./powerHouse")
const accessKey = require('../models/acces-keys');

const populate_keys = (email, password) => {
  const keys = generateApiKey(email, password);
  const apiKey = keys.encryptedData;
  const iv = keys.iv;
  const decryptionKey = keys.key;

  accessKey.create({apiKey:apiKey, iv:iv, decryptionKey:decryptionKey}).then(() => {
    console.log("keys posted successfully")
  }) 

}

const populateAuthKeys  = (req, res) => {
  const apiKey  = req.params.apiKey 
  const authKey = generateAuthKey();
  accessKey.findOneAndUpdate({apiKey: apiKey}, {authKey: authKey}).then((error) => {
    res.send(authKey)
  })
  
}

module.exports = {populate_keys, populateAuthKeys }