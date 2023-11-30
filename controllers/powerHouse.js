// This module contains all the controllers reponsible for generations
// Contains controllers of QRcodes, passwords, sessions and e.t.c

const qrcode = require('qrcode');
const fs = require('fs');
const express = require('express');
const session = require('express-session');

const app = express();

app.use(
  session({
    secret: 'ElimuHub-secrets',
    resave: false,
    saveUninitialized: true,
  })
);

const generateAndPopulateSession = (userAuthKey = 'None', userEmail, userPassword, duration) => {
  return (req, res) => {
    const currentTime = new Date();
    req.session.logInData = {
      authKey: userAuthKey,
      email: userEmail,
      password: userPassword,
      sessionDuration: duration,
      startingTime: currentTime
    }
    res.send(req.session);
  }
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

module.exports = {generateQRCode, passwordGenerator, generateAndPopulateSession, checkSessionValidity};
