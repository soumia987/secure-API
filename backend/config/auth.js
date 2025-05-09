const jwt = require('jsonwebtoken');
const User = require('./../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';
const JWT_EXPIRES = '1h';

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.json({ 
      user: { 
        id: user._id, 
        username: user.username,
        role: user.role,
        email: user.email
      }, 
      token 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.json({ 
      user: { 
        id: user._id, 
        username: user.username,
        role: user.role,
        email: user.email
      }, 
      token 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Not authorized' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'You do not have permission to perform this action' });
    }
    next();
  };
};