const express = require('express');
const admin = require('../config/firebase');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    res.status(201).json({ uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);

    // Here you would typically verify the password and generate a token
    // For simplicity, we're just returning the user record
    res.status(200).json({ uid: user.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;