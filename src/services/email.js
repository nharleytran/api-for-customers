import nodemailer from "nodemailer";
import { message } from "../views/pages.js";

export async function sendKey(name, email, key) {

  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "91bb57e9e61cd6",
      pass: "5189324f78edac"
    }
  });

  let info = await transporter.sendMail({
    from: '<support@clients-api.com>', // sender address
    to: `<${email}>`, // list of receivers
    subject: "Your Clients API Key.", // Subject line
    html: message(name, key), // html body
  });
}