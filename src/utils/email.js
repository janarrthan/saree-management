const { createTransport } = require('nodemailer');

const sendMail = (data) => {
    try{
        const transporter = createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.BREVO_API_KEY,
            },
        });

        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: data.email,
            subject: data.subject,
            text: data.message
        };
    
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }catch(e){
        console.log(e.message);
    }
}

module.exports = sendMail;


