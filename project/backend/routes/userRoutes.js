
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { id, name, email, studentId, department, joinDate, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      id,
      name,
      email,
      studentId,
      department,
      joinDate,
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      studentId: savedUser.studentId,
      department: savedUser.department,
      joinDate: savedUser.joinDate
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login existing user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      studentId: user.studentId,
      department: user.department,
      joinDate: user.joinDate
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
