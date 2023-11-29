// This module contains all the controllers reponsible for generations
// Contains controllers of QRcodes, passwords

const qrcode = require('qrcode');
const fs = require('fs');
const crypto = require('crypto');

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

  return { key: key, iv: iv, encryptedData: encryptedData };
};



module.exports = {generateQRCode, passwordGenerator, generateApiKey, generateAuthKey};
