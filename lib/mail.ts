import nodemailer from "nodemailer";

export const sendEmail = async (data:any) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: data.email,
    to: "info@emgofarms.com",
    subject: "New Contact Message",
    text: data.message,
  });
};
