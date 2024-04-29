const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: 'labanrotich6544@gmail.com',
        pass: 'tzwu zwow obrb ocnn'
    }
});

const sendEmail = async (email, password) => {
    try {
        const mailOptions = {
            from: 'your_email@example.com',
            to: email,
            subject: 'Your Login Credentials',
            text: `Your login credentials:\nEmail: ${email}\nPassword: ${password}`
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;


