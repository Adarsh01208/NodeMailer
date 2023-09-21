const nodemailer = require('nodemailer');

const  {EMAIL , PASSWORD} = require('../env.js');
const Mailgen = require('mailgen');


const signup = async (req , res) => {

    let  testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: testAccount.user,
          pass: testAccount.pass
        }
      });

    let message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hey Aadi", // plain text body
        html: "<b>Hey Adarsh</b>", // html body
    }

    // transporter.sendMail(message).then(info => {
    //     return res.status(200).json({
    //         message: 'Signup successfull',
    //         info: info.messageId,
    //         preview: nodemailer.getTestMessageUrl(info)
    //     });

    //     }).catch(err => {
    //         console.log(err);
    //         return res.status(500).json({
    //             message: 'Signup failed',
    //             error: err
    //         });
    //     });

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Signup failed',
                error: err
            });
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return res.status(200).json({
            message: 'Signup successfull',
            info: info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        });
    });

  
  // res.status(200).json('Signup successfull');
}

const getbill = (req , res) => {

   const {username} = req.body;

    let config = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    };

    let transporter = nodemailer.createTransport(config);
    let MailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Test',
            link: 'https://mailgen.js/'
        }
    });

    let response = {
        body: {
            name: 'Adarsh',
            intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with Mailgen, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: 'https://mailgen.js/'
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };

    let mail = MailGenerator.generate(response);

    let message = {
        from: EMAIL,
        to: username,
        subject: 'Welcome to Mailgen!',
        html: mail
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Signup failed',
                error: err
            });
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return res.status(200).json({
            message: 'Signup successfull',
            info: info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        });
    });



    // res.status(200).json('Get Bill');
}

module.exports = {
    signup,
    getbill
}