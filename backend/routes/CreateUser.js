const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create User POST METHOD
router.post(
  '/createuser',
  [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must be greater than 8 characters').isLength({ min: 8 }),
    body('name', 'Name must be greater than 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

// Login User POST METHOD
router.post(
  '/loginuser',
  [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must be greater than 8 characters').isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;

    try {
      let userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({ errors: 'Try logging with correct credentials' });
      }

      const passwordCompare = await bcrypt.compare(req.body.password, userData.password);
      if (!passwordCompare) {
        return res.status(400).json({ errors: 'Try logging with correct credentials' });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const jwtSecret = 'HelloWorldMyNameis-Baibhav-KC_324$@!%';

      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
