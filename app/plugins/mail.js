'use strict';

const NodeMailer = require('nodemailer');
const MailGen    = require('mailgen');
const bunyan     = require('bunyan');

/**
 * Mail transporter
 */
let transporter = NodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kdessi02@gmail.com',
        pass: 'ettasoeur'
    }
});

/**
 * Mail generator
 *
 * @type {Mailgen}
 */
let mailGenerator = new MailGen({
    theme: 'default',
    product: {
        name: 'Hapi Boilerplate',
        link: 'http://localhost:3000/'
    }
});

/**
 * Mail sent to the user on creation
 *
 * @param email_address
 * @param login
 * @param plainPassword
 */
module.exports.sendUserCreate = (email_address, login, plainPassword) => {

    let email = {
        body: {
            name: login,
            intro: [
                'Welcome to Hapi Boilerplate!',
                'Here are your authentication data :',
                'Login : ' + login,
                'Password : ' + plainPassword
            ],
            action: {
                instructions: 'Here you can connect to Hapi Boilerplate : ',
                button: {
                    color: '#22BC66',
                    text: 'Connect',
                    link: 'http://localhost:3000/authent'
                }
            },
            outro: ''
        }
    };

    let emailBody = mailGenerator.generate(email);
    let emailText = mailGenerator.generatePlaintext(email);

    let mailOptions = {
        from: 'System <system@gmail.com>',
        to: email_address,
        subject: 'User created',
        text: emailText,
        html: emailBody
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Message %s sent: %s', info.messageId, info.response);
        }
    });
};

/**
 * Mail sent to the user on update
 *
 * @param email_address
 * @param id
 */
module.exports.sendUserUpdate = (email_address, id) => {

    let email = {
        body: {
            name: 'User update',
            intro: 'Your data has changed.',
            action: {
                instructions: 'Here you can see it :',
                button: {
                    color: '#22BC66',
                    text: 'Display my data',
                    link: 'http://localhost:3000/user/' + id
                }
            },
            outro: ''
        }
    };

    let emailBody = mailGenerator.generate(email);
    let emailText = mailGenerator.generatePlaintext(email);

    let mailOptions = {
        from: 'System <system@gmail.com>',
        to: email_address,
        subject: 'User updated',
        text: emailText,
        html: emailBody
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Message %s sent: %s', info.messageId, info.response);
        }
    });
};

/**
 * Mail sent to the user on password update
 *
 * @param email_address
 * @param login
 * @param plainPassword
 */
module.exports.sendUserUpdatePassword = (email_address, login, plainPassword) => {

    let email = {
        body: {
            name: 'User password update',
            intro: [
                'Your password has changed.',
                'Here you can try to connect with :',
                'Login : ' + login,
                'Password : ' + plainPassword
            ],
            action: {
                instructions: 'Here you can connect to Hapi Boilerplate : ',
                button: {
                    color: '#22BC66',
                    text: 'Connect',
                    link: 'http://localhost:3000/authent'
                }
            },
            outro: ''
        }
    };

    let emailBody = mailGenerator.generate(email);
    let emailText = mailGenerator.generatePlaintext(email);

    let mailOptions = {
        from: 'System <system@gmail.com>',
        to: email_address,
        subject: 'User password updated',
        text: emailText,
        html: emailBody
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Message %s sent: %s', info.messageId, info.response);
        }
    });
};
