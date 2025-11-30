const express = require('express');
const router = express.Router();
const { 
  createUser, 
  validatePassword, 
  findUserById 
} = require('../db/users');
const { generateToken, verifyToken } = require('../middleware/auth');

// POST /api/auth/signup - Register new user
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, role, studentId } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'Email, password, and name are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email',
        message: 'Please provide a valid email address' 
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Weak password',
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Create user data object
    const userData = { email, password, name };
    if (role) userData.role = role;
    if (studentId) userData.studentId = studentId;

    // Create user
    const user = await createUser(userData);

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user,
      token
    });
  } catch (error) {
    if (error.message === 'User with this email already exists') {
      return res.status(409).json({ 
        error: 'User exists',
        message: error.message 
      });
    }
    res.status(500).json({ 
      error: 'Registration failed',
      message: error.message 
    });
  }
});

// POST /api/auth/login - Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Missing credentials',
        message: 'Email and password are required' 
      });
    }

    // Validate credentials
    const user = await validatePassword(email, password);

    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid credentials',
        message: 'Email or password is incorrect' 
      });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Login successful',
      user,
      token
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Login failed',
      message: error.message 
    });
  }
});

// GET /api/auth/me - Get current user (requires authentication)
router.get('/me', verifyToken, (req, res) => {
  try {
    const user = findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'User does not exist' 
      });
    }

    const { password, ...userWithoutPassword } = user;
    res.json({
      success: true,
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch user',
      message: error.message 
    });
  }
});

// POST /api/auth/logout - Logout user (client-side token removal)
router.post('/logout', verifyToken, (req, res) => {
  // In JWT-based auth, logout is handled client-side by removing the token
  // This endpoint confirms the logout action
  res.json({
    success: true,
    message: 'Logout successful. Please remove the token from client storage.'
  });
});

// POST /api/auth/verify - Verify token validity
router.post('/verify', verifyToken, (req, res) => {
  res.json({
    success: true,
    valid: true,
    user: req.user
  });
});

module.exports = router;
