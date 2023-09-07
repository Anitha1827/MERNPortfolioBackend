import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "anitha.h2711@gmail.com",
      pass: "xnqsyrzdqztmlxbj",
    },
  });

  const mailOptions = {
    from: "anitha.h2711@gmail.com",
    to: email,
    subject: "Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Email sending failed");
    } else {
      console.log("email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
