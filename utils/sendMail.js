const nodemailer = require( 'nodemailer' );

const sendEmailHandler = async (email, subject, text) =>{
    try{
        const transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            service:"gmail",
            port:"587",
            secure:true,
            auth:{
             user:"namisha.gurunani173261@gmail.com",
             pass: process.env.EMAIL_KEY,
            },
        });

        await transporter.sendMail({
           from:"namisha.gurunani173261@gmail.com",
           to: email,
           subject:subject,
           text:text,
        });
        console.log("email sent successfully");
    }catch(err){
        console.log("email not sent!");
        console.log(err);
        return err;
    }
};

module.exports = {sendEmailHandler} ;