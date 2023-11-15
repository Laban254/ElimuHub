// This module contains all the controllers reponsible for generations
// Contains controllers of QRcodes, passwords

const qrcode = require('qrcode');
const fs = require('fs');

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

module.exports = {generateQRCode, passwordGenerator};
