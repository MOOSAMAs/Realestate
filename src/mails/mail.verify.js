import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken'
import { mailTemp } from "../utils/mail.html.js";

export const verifyEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: "medoosos129@gmail.com",
        pass: "hvwj ypxp gaxg rfiw",
      },
  });

  const token = jwt.sign({ email: options.email }, process.env.MAIL_SECRET);

  const info = await transporter.sendMail({
    from: '"Sakkany" <medoosos129@gmail.com>',
    to: options.email,
    subject: "Verify ✔",
    text: "Verification", 
    html:mailTemp(token), 
  });
};
