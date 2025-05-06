const express = require('express');
const { register, login, protect } = require('./auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;