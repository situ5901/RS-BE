const express = require('express');
const router = new express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config(); // Ensure this line is present to load environment variables

router.post("/register", (req, res) => {
    console.log(req.body);
    const { email, message, phone, name } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Registration Details",
            html: `
                <b>Congratulations ${name}, you have successfully registered!</b>
                <p>Your registration details are as follows:</p>
                <p>Username: ${name}</p>
                <p>Email: ${email}</p>
                <p>Phone Number: ${phone}</p>
                <p>Message: ${message}</p>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error", error);
                res.status(500).json({ status: 500, message: "Failed to send email" });
            } else {
                console.log("Email Sent: " + info.response);
                res.status(201).json({ status: 201, message: "Email sent successfully" });
            }
        });
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});

module.exports = router;
