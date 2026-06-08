import nodemailer from "nodemailer";


const EMAIL_USER = process.env.EMAIL_USER!;
const EMAIL_PWD = process.env.EMAIL_PWD!;
const EMAIL_FORWARD = process.env.EMAIL_FORWARD

if (!EMAIL_USER || !EMAIL_PWD) {
  throw new Error("Email environment variables are not configured");
}

console.log("USER:", EMAIL_USER);


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PWD,
  },
});

/*
await transporter.verify();
console.log("SMTP connection verified");
*/
export async function sendEmail(
  to: string,
  subject: string,
  text: string
): Promise<void> {
  try {
    const info = await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_FORWARD,
      bcc: EMAIL_USER, // CC to self for record
      subject,
      text,
    });

    console.log("MAIL INFO:", info);
  } catch (err) {
    console.error("SMTP ERROR:", err);
    throw err;
  }
}
