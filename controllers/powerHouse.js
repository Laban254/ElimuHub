// This module contains all the controllers reponsible for generations
// Contains controllers of QRcodes, passwords, sessions and e.t.c

const qrcode = require('qrcode');
const fs = require('fs');
const crypto = require('crypto');
const user  = require("../models/users");
const bcrypt = require('bcrypt');
const User = require('../models/users');
const express = require('express');
const session = require('express-session');
const os = require('os');
const app = express();
const {server} = require('../Server')
const http = require('http');

const startSessionOptions = {
  hostname: server.address,
  path: '/startSession',
  method: 'GET',
  port: 3000
  
};



app.use(
  session({
    secret: 'ElimuHub-secrets',
    resave: false,
    saveUninitialized: true,
  })
);

const generateAndPopulateSession = (req, res) => {
    const currentTime = new Date();
    req.session.logInData = {
      authKey: req.query.authKey,
      email: req.query.userEmail,
      password: req.query.userPassword,
      sessionDuration: req.query.duration,
      startingTime: currentTime
    }
    res.send(req.session);
};

// This is the function that check if the session is still valid
// If valid, the information in the session is left as is, otherwise,
//the information is either changed or the session is deleted as a whole
const checkSessionValidity = (req, res) => {
  const startTime = new Date(req.session.logInData.startingTime);
  const sessionDuration = req.session.logInData.sessionDuration;
  const expirationTime = new Date(startTime.getTime() + (sessionDuration * 60));
  const currentTime = new Date();
  if (currentTime.getTime() > expirationTime.getTime())
  {
    delete req.session.logInData;
  }
  res.send("stil on");
}

const generateQRCode = async (url, filename) => {
  try {
    const qrCodeDataUrl = await qrcode.toDataURL(url);
    const qrCodeBuffer = Buffer.from(qrCodeDataUrl.split(',')[1], 'base64');
    
    fs.writeFileSync(filename, qrCodeBuffer);
  } catch (error) {
    console.error('Error generating QR code:', error.message);
  }
};

const passwordGenerator = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_-+=<>?';

    const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;

    let password = '';
    const length = 8;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    return password;
};

const generateAuthKey = (length = 64) => {
  const apiKey = crypto
      .randomBytes(length)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

  return apiKey;
};


const generateApiKey = (email, password) => {
  // Generate a random key
  const key = crypto.randomBytes(32); // You can choose the key size based on your encryption algorithm

  // Encrypt information
  const algorithm = 'aes-256-cbc'; // Choose an encryption algorithm, here using AES with CBC mode
  const dataToEncrypt = { email: email, password: password };
  const iv = crypto.randomBytes(16); // Initialization vector for AES
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  // Convert the object to a JSON string before encryption
  const dataToEncryptString = JSON.stringify(dataToEncrypt);

  let encryptedData = cipher.update(dataToEncryptString, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');

  // Convert key and iv to hexadecimal strings
  const keyHex = key.toString('hex');
  const ivHex = iv.toString('hex');

  return { key: keyHex, iv: ivHex, encryptedData: encryptedData };
};




const algorithm = 'aes-256-cbc';

const decryptApiKey = async (encryptedApiKey, decryptionKeyString, ivString) => {
  try {
    // Convert string representations to Buffer objects
    const decryptionKey = Buffer.from(decryptionKeyString, 'hex');
    const iv = Buffer.from(ivString, 'hex');

    // Convert encryptedApiKey to a Buffer
    const encryptedBuffer = Buffer.from(encryptedApiKey, 'hex');

    // Decrypt the buffer using the appropriate algorithm and key
    const decipher = crypto.createDecipheriv(algorithm, decryptionKey, iv);

    // Decrypt the buffer and convert it to a string
    let decrypted = decipher.update(encryptedBuffer, 'binary', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
  } catch (error) {
    console.error('Error in decryptApiKey:', error);
    throw new Error('Failed to decrypt API key');
  }
};


const findUserByEmailAndPassword = async (email, password) => {
  console.log(email)
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      // User not found
      console.log('User not found');
      return({ message: 'Incorrect email or password' });
    }

    // Use bcrypt.compare to compare the provided password with the hashed password in the database
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error('Error comparing passwords', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (result) {
        // Passwords match, user successfully logged in
        const req = http.request(startSessionOptions, (res) => {
          let data = '';
        
          res.on('data', (chunk) => {
            data += chunk;
          });
        
          res.on('end', () => {
            console.log(data);
          });
        });
        
        req.on('error', (error) => {
          console.error(error);
        });
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


module.exports = {generateQRCode, passwordGenerator, generateApiKey, generateAuthKey, decryptApiKey, findUserByEmailAndPassword ,generateAndPopulateSession, checkSessionValidity};

