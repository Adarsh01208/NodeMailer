const nodemailer = require('nodemailer');


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
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    }

    transporter.sendMail(message).then(info => {
        return res.status(200).json({
            message: 'Signup successfull',
            info: info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        });

        }).catch(err => {
            console.log(err);
            return res.status(500).json({
                message: 'Signup failed',
                error: err
            });
        });

  
  // res.status(200).json('Signup successfull');
}

const getbill = (req , res) => {
    res.status(200).json('Get Bill');
}

module.exports = {
    signup,
    getbill
}