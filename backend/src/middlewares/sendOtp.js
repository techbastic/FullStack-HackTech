import { randomBytes } from 'crypto';
import nodemailer from 'nodemailer'; // Or any other service for sending OTP

const generateOtp = () => {
    return randomBytes(3).toString('hex'); // Generates a 6-digit OTP
};

export const sendOtp = async (req, res) => {
    const { email } = req.body; // Assuming email is in the request body

    try {
        const otp = generateOtp();

        // Store OTP in Redis with an expiration time (e.g., 5 minutes)
        await req.redisClient.set(email, otp, 'EX', 300);

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            // Configure your email service here

        });

        await transporter.sendMail({
            from: 'no-reply@yourapp.com',//sender email address
            to: email,//reciever email address
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`,
        });

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
