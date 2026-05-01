// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

exports.registerValidators = [
    body('username').isLength({ min: 3 }).trim(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
];


exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;
    try {
        // check duplicates
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) return res.status(400).json({ message: 'Email or username already in use' });

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        user = new User({ username, email, passwordHash });
        await user.save();

        // sign JWT
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES || '7d'
        });

        return res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.loginValidators = [
    body('username').optional().trim(),
    body('email').optional().isEmail(),
    body('password').exists()
];

exports.login = async (req, res) => {
  try {
    // 1. Επαλήθευση captcha
    const captcha = req.body['g-recaptcha-response'];
    if (!captcha) return res.status(400).json({ message: 'Captcha missing' });

    const secretKey = process.env.RECAPTCHA_SECRET;

    // χρησιμοποιούμε POST body αντί για query string
    const captchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${captcha}`
    });

    const captchaJson = await captchaRes.json();
    if (!captchaJson.success) {
      return res.status(400).json({ message: 'Captcha verification failed' });
    }

    const { email, username, password } = req.body;
    const user = await User.findOne(email ? { email } : { username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || '7d' }
    );

    return res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};