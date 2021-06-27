const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require('express-validator');

const User = require("../models/User");
const auth = require("../middleware/auth");

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get(
  "/",
  auth,
  async (req, res) => {
    // res.send("Get logged in user");
    try {
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch(err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/auth
// @desc    Auth user & get token
// @access  public
router.post(
  "/",
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password is incorrect").exists(),
  async (req, res) => {
    // res.send("Log in user");
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if(!user) {
        return res.status(400).json({ msg: "User does not exist." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res.status(400).json({ msg: "Wrong password" });
      }

      const payload = { user: { id: user.id } };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if(err) throw err;
          res.json({ token });
        }
      );
    } catch(err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
