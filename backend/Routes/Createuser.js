const express = require('express');
const router = express.Router();
const user = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwtsecret = process.env.jwtsecret;

router.post(
  '/createuser',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('name').isLength({ min: 5 }),
 
    body('password', 'Incorrect password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Bycrpt password
    const salt = await bcrypt.genSalt(10);
    let securepassword = await bcrypt.hash(req.body.password, salt);

    try {
      await user.create({
        name: req.body.name,
        password: securepassword,
        email: req.body.email,
        location: req.body.location,
        role:'customer',
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  '/loginuser',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Incorrect password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      let userdata = await user.findOne({ email });
      if (!userdata) {
        return res.status(400).json({ errors: 'Try logging in with correct credentials' });
      }

      const pwdcompare = await bcrypt.compare(req.body.password, userdata.password);

      if (!pwdcompare) {
        return res.status(400).json({ errors: 'Enter valid password' });
      }

      const data = {
        user: {
          id: userdata.id,
          name: userdata.name, 
        },
      };
      const authToken = jwt.sign(data, jwtsecret);
      return res.json({ success: true, authToken: authToken, userName: userdata.name }); // Send authToken and username in the response
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
