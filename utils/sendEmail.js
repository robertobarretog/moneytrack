import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

const sendEmail = async options => {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  );

  const mailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.SMTP_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
};

export default sendEmail;
