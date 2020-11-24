import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transport = nodemailer.createTransport({
  service: 'mailjet',

  host: 'in-v3.mailjet.com',
  port: 587,
  auth: {
    user: process.env.JET_MAIL_USER,
    pass: process.env.JET_MAIL_PASSWORD,
  },
});

class MailService {
  static async sendmail(mail) {
    transport.sendMail(mail);
  }
}

export default MailService;
