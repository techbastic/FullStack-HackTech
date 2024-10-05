import { findOne, create, findById } from '../models/userModel';
import { sign } from 'jsonwebtoken';
import { genSalt, hash, compare } from 'bcrypt';

const generateToken = (userId) => {
    return sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export async function register(req, res) {
    const { username, email, password } = req.body;

    try {
        const userExists = await findOne({ email });

        if (userExists) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const user = await create({
            username,
            email,
            password: hashedPassword
        });

        const token = generateToken(user._id);

        // Store token in Redis
        req.redisClient.set(user._id.toString(), token, 'EX', 3600);

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'No user found' });
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        // Store token in Redis
        req.redisClient.set(user._id.toString(), token, 'EX', 3600);

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function changePassword(req, res) {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    try {
        const user = await findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }
        
        const salt = await genSalt(10);
        const hashedNewPassword = await hash(newPassword, salt);

        user.password = hashedNewPassword;
        await user.save();
        
        req.redisClient.del(userId.toString());

        const token = generateToken(user._id);
        
        req.redisClient.set(user._id.toString(), token, 'EX', 3600);

        res.status(200).json({ message: 'Password changed successfully', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function logout(req, res) {
    try {
        const { userId } = req.user; // Assuming you have a middleware to verify user

        req.redisClient.del(userId.toString());

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
