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
          role: user.role
        }, 
        token 
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };