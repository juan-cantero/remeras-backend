import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transport = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.GOOGLE_MAIL,
    pass: process.env.GOOGLE_PASSWORD,
  },
});

class MailService {
  static async sendmail(mail) {
    transport.sendMail(mail);
  }
}

export default MailService;
